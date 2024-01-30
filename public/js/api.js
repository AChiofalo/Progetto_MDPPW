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


    static doSignUpCustomer = async function(username, password, first_name, last_name){
        let response = await fetch("/api/customers", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username, password, first_name, last_name})
        });
        if(response.ok) {
            const res = await response.json();
            return res.msg;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.msg;
            }
            catch(err) {
                    throw err;
            }

    }

    static doSignUpVendor = async function(username, password, name, description){
        let response = await fetch("/api/vendors", {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({username, password, name, description})
        });
        if(response.ok) {
            const res = await response.json();
            return res.msg;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.msg;
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
            const res = await response.json()
            return res.username;
        }
        else
            try {
                const errDetail = await response.json();
                throw errDetail.msg;
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