"use strict";


//import { response } from "express";

import Product from "./product.js";
import Vendor from "./vendor.js";


class Api {


    static getProduct = async (id) => {
        let res = await fetch(`/api/products/${id}`);
        const productJson = await res.json();
        if(res.ok)
            return productJson;
        else
            throw productJson;
    }

    static getProducts = async () => {
        let res = await fetch(`/api/products`);
        const productsJson = await res.json();
        if(res.ok)
            return productsJson.map((product) => Product.from(product));
        else
            throw productsJson;
    }

    static getVendor = async (id) => {
        let res = await fetch(`/api/vendors/${id}`);
        const vendorJson = await res.json();
        if(res.ok)
            return vendorJson;
        else
            throw vendorJson;
    }

    static getVendors = async () => {
        let res = await fetch(`/api/vendors`);
        const vendorsJson = await res.json();
        if(res.ok)
            return vendorsJson.map((vendor) => Vendor.from(vendor));
        else
            throw vendorsJson;
    }


    static doSignUp = async function(username, password){
        let response = await fetch("/api/users", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        if(response.ok) {
            const username = await response.json()
            return username;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            }
            catch(err) {
                    throw err;
            }

    }




    static doLogin = async function(username, password){
        let response = await fetch("/api/sessions", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username, password})
        });
        if(response.ok) {
            const username = await response.json()
            return username;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.message;
            }
            catch(err) {
                    throw err;
            }

    }
    /**
     * Perform the logout
     */
    static doLogout = async () => {
        await fetch('/api/sessions/current', { method: 'DELETE' });
    }

}

export default Api;