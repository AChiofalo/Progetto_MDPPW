"use strict";


//import { response } from "express";

import Product from "./product.js";
import Vendor from "./vendor.js";


class Api {

    //API PER CATALOGO PRODOTTI
    static getProduct = async (name) => {
        let res = await fetch(`/api/products/${name}`);
        const body = await res.json();
        const productJson = body.product;
        if (res.ok)
            return Product.from(productJson);
        else
            throw productJson;
    }
    static getProducts = async (name) => {
        let res;
        if (name)
            res = await fetch(`/api/products/?name=${name}`);
        else
            res = await fetch(`/api/products`)
        const body = await res.json();
        const productsJson = body.products;
        if (res.ok)
            return productsJson.map((product) => Product.from(product));
        else
            throw body;
    }

    //API NON USATE PER CATALOGO VENDITORI
    static getVendor = async (id) => {
        let res = await fetch(`/api/vendors/${id}`);
        const vendorJson = await res.json();
        if (res.ok)
            return vendorJson;
        else
            throw vendorJson;
    }
    static getVendors = async () => {
        let res = await fetch(`/api/vendors`);
        const vendorsJson = await res.json();
        if (res.ok)
            return vendorsJson.map((vendor) => Vendor.from(vendor));
        else
            throw vendorsJson;
    }

    //API REGISTRAZIONI
    static doSignUpCustomer = async function (username, password, first_name, last_name) {
        let response = await fetch("/api/customers", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, first_name, last_name })
        });
        if (response.ok) {
            const res = await response.json();
            return res.msg;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.msg;
            }
            catch (err) {
                throw err;
            }

    }
    static doSignUpVendor = async function (username, password, name, description) {
        let response = await fetch("/api/vendors", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, name, description })
        });
        if (response.ok) {
            const res = await response.json();
            return res.msg;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.msg;
            }
            catch (err) {
                throw err;
            }

    }

    //AGGIUNTA PRODOTTO
    static doAddProduct = async function (name, description, quantity_available, price) {
        let response = await fetch("/api/products", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, description, quantity_available, price })
        });
        if (response.ok) {
            const res = await response.json();
            return res.msg;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.msg;
            }
            catch (err) {
                throw err;
            }

    }

    //SESSIONI
    /**
     * @param {String} username 
     * @param {String} password 
     * @returns risposta server - oggetto user(id,username,role)
     */
    static doLogin = async function (username, password) {
        let response = await fetch("/api/sessions", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        if (response.ok) {
            const res = await response.json();


            return res;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.msg;
            }
            catch (err) {
                throw err;
            }

    }

    static doLogout = async () => {
        await fetch('/api/sessions/current', { method: 'DELETE' });
    }

    //TRANSAZIONE DEL CARRELLO
    static doCheckOut = async (flowCart) => {

        let res = await fetch(`/api/checkout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ flowCart })
        });

        if (res.ok){
            const json = await res.json();
            return json;
        }
        else{
            try {
                const errDetail = await res.json();
                throw errDetail.msg;
            }
            catch (err) {
                throw err;
            }
        }


    }

    //CAMBIAMENTI TRAMITE PATCH
    static doChangeWallet = async (change, role) => {

        let res = await fetch(`/api/${role}s/wallet`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ change })
        });

        if (res.ok){
            const json = await res.json();
            return json;
        }
        else{
            try {
                const errDetail = await res.json();
                throw errDetail.msg;
            }
            catch (err) {
                throw err;
            }
        }


    }

    static doUpdateQuantity = async (name,change) => {

        let res = await fetch(`/api/products/${name}/quantity`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ change })
        });
        const json = await res.json();
        if (res.ok)
            return json;
        else
            throw json;
    }

    /**
     * Funzione di supporto per ottenere dati da mostrare all'utente, come il wallet.
     * 
     * @param {Number} id 
     * @param {String} role 
     * @returns oggetto vendor o customer
     */
    static getPersonalData = async (id, role) => {

        let res = await fetch(`/api/${role}s/${id}`);
        const json = await res.json();
        if (res.ok)
            return json;
        else
            throw json;

    }



}



export default Api;