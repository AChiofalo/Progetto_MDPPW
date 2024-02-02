'use strict';
const Normalizer = require('../normalize/normalizer.js');

const customerDao = require('../models/customer-dao.js');
const vendorDao = require('../models/vendor-dao.js');
const productDao = require('../models/product-dao.js');

const express = require('express');
const router = express.Router();

const authSupp = require('../auth-support.js');

const normalizer = new Normalizer();  //Normalizzatore

/**
 * Performa il checkout. 
 * Recupera cliente e prodotti dagli id. 
 * Controlla che la quantità di prodotti siano disponibili.
 * Controlla che il saldo del cliente sia adeguato
 * Performa operazioni di modifica sulle quantità
 */
router.post('/', authSupp.isCustomer, /*normalizer.normalizeCheckout //TODO*/ async (req,res) => {
    try{
        const resCustomer = await customerDao.getCustomerById(req.user.id);
        const customer = resCustomer.customer;
        //const lista = req.body.list;
        const lista = [2,2,2];
        let insieme = {};

        for(const i of lista){
            if(!insieme[i])
                insieme[i] = 1;
            else
                insieme[i] ++;     
        }

        let products = [];

        const totalCost = 0;
        
        //Recupero prodotti, se uno non essite restituisco errore da dao
        //se mi richiedono più item di quelli disponibili restituisco errore
        for(const i in insieme){
            const daoRes = await productDao.getProductById(i);
            const product = daoRes.product
            if(product.quantity_available < insieme[i]){
                const err = new Error();
                err.msg = "Not enough items";
                err.code = 400;
                throw err;
            }
            product.totCost = product.price * insieme[i];
            product.diff = insieme[i]; //Quantità da eliminare
            products.push(product);
        }
        
        const totPrice = products.reduce((acc, curr) => acc + curr.totCost , 0);
        //Se il costo del carrello è maggiore del wallet restituisco errore
        if(totPrice > customer.wallet){
            const err = new Error();
            err.msg = "Not enough credit";
            err.code = 400;
            throw err;
        }

        let vendorsSet = [];
        let vendorsKey = [];
        //Recupero vendors 
        for(const i of products){
            if(!vendorsKey.includes(i.vendor_id)){
                const res = await vendorDao.getVendorById(i.vendor_id)
                vendorsKey.push(i.vendor_id);
                vendorsSet.push(res.vendor);

            }
        }
        
        //Calcolo revenue ciascuno
        vendorsSet.forEach((vendor)=> {
            vendor.revenue = 0;
            products.forEach((val)=>{
                if(val.vendor_id == vendor.id)
                    vendor.revenue += val.totCost;
            });
        });

        
        

        //Patch tutti wallets vendor
        for(const i of vendorsSet){
            const newW = i.revenue + i.wallet;
            await vendorDao.updateWalletById(i.id,newW);
        }

        //Patch wallet cliente
        const newW = customer.wallet - totPrice;
        await customerDao.updateWalletById(req.user.id,newW);

        //Patch quantità viabili prodotti

        products.forEach( async (curr) => {
            const newQ = curr.quantity_available - curr.diff;
            await productDao.updateQuantityById(curr.id, newQ);
        });

        res.status(200).json({code:200, msg:"Tutto fatto!"}).end()
    } 
    catch(err){
        res.status(err.code).json(err).end();
    }



});

module.exports = router;