'use strict';
const Normalizer = require('../normalize/normalizer.js');

const dao = require('../models/product-dao.js');
const express = require('express');
const router = express.Router();

const authSupp = require('../auth-support.js');
const normalizer = new Normalizer();  //Normalizzatore

/**
 * Restituisce la risorsa product tramite req.params.name
 */
router.get('/:name', (req, res) => {
  dao.getProduct(req.params.name)
    .then((result) => res.status(result.code).json(result).end())
    .catch((err) => res.status(err.code).json(err));
});

/**
 * Restituisce tutti i product, se query presente quelli che iniziano con name specificato
 */
router.get('/', (req, res) => {
  dao.searchProductsByName(req.query.name ? req.query.name : "")
    .then((result) => res.status(result.code).json(result).end())
    .catch((err) => res.status(err.code).json(err));
});

/**
 * Inserisce un nuovo product usando req.body
 */
router.post('/', authSupp.isVendor, normalizer.normalizeCreateProduct, (req, res) => {


  const product = {
    "name": req.body.name,
    "vendor_id": req.user.id,
    "description": req.body.description,
    "quantity_available": req.body.quantity_available,
    "price": req.body.price
  }

  dao.createProduct(product)
    .then((result) => res.status(result.code).json(result).end())
    .catch((err) => res.status(err.code).json(err));
});

/**
 * Cancella la risorsa product se presente associata al venditore req.user.id
 */
router.delete('/:name', authSupp.isVendor ,(req, res) => {
  dao.deleteProduct(req.params.name, req.user.id)
    .then((result) => res.status(result.code).json(result).end())
    .catch((err) => res.status(err.code).json(err));
});

/**
 * Cambia qantità in base al change
 */
router.patch('/:name/quantity', authSupp.isVendor, normalizer.normalizeUpdateQuantity, async (req, res) => {

  try {
    const resGet = await dao.getProduct(req.params.name);
    const newQuantity = resGet.product.quantity_available + req.body.change;
    if (newQuantity < 0) {
      const err = new Error();
      err.msg = "No quantity";
      err.code = "400";
      throw err;
    }

    const result = await dao.updateQuantity(req.params.name, newQuantity, req.user.id);
    res.status(result.code).json(result).end();
  }
  catch (err) {
    res.status(err.code).json(err).end();
  }



});



module.exports = router;