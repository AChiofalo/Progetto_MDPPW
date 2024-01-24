"use strict";

const Validator = require('./validator.js');
const Sanitizer = require('./sanitizer.js');
const Checker = require('./checker.js');


class Normalizer{   
    constructor(){
        this.validator = new Validator();
        this.sanitizer = new Sanitizer();
        this.checker = new Checker();
    }


    normalizeCreateVendor = (req, res, next) => {
        try {
            this.checker.checkCreateVendor(req.body);
            this.validator.validateUsername(req.body.username);
            req.body.username = this.sanitizer.sanitizeUsername(req.body.username);

            return next();
            
        } catch(err){
            res.status(400).json({"code" : 400, "msg" : err.message});
        }
    }

    normalizeCreateProduct =  (req, res, next) => {
        try {
            this.checker.checkCreateProduct(req.body);
            this.validator.validateName(req.body.name);
            req.body.name = this.sanitizer.sanitizeName(req.body.name);

            this.validator.validateUsername(req.body.vendor_username);
            req.body.vendor_username = this.sanitizer.sanitizeName(req.body.vendor_username);

            this.validator.validateQuantity(req.body.price);
            this.validator.validateQuantity(req.body.quantity_available);

            return next();
            
        } catch(err){
            res.status(400).json({"code" : 400, "msg" : err.message});
        }
    }

    normalizeUpdateWallet = (req, res, next) => {
        try {
            this.checker.checkUpdateQuantity(req.body);
            this.validator.validateQuantity(req.body.change);

            return next();
            
        } catch(err){
            res.status(400).json({"code" : 400, "msg" : err.message});
        }
    }



    normalizeCustomer = (req, res, next) => {
        try {

            this.validator.validateUsername(req.body.username);
            this.validator.validateName(req.body.first_name);
            this.validator.validateName(req.body.last_name);
            this.validator.validatePrice(req.body.wallet);


            req.body.first_name = this.sanitizer.sanitizeName(req.body.first_name);
            req.body.last_name = this.sanitizer.sanitizeName(req.body.last_name);
            req.body.wallet = this.sanitizer.sanitizePrice(req.body.wallet);

            return next();

        } catch(err){
            res.status(400).json({"code" : 400, "msg" : err});
        }
    }

    normalizeProduct = (req, res, next) => {
        try {
            this.validator.validateName(req.body.name);
            this.validator.validateQuantity(req.body.quantity_available);
            this.validator.validatePrice(req.body.price);


            req.body.name = this.sanitizer.sanitizeName(req.body.name);
            req.body.wallet = this.sanitizer.sanitizePrice(req.body.wallet);

            return next();

        } catch(err){
            res.status(400).json({"code" : 400, "msg" : err});
        }
    }

}

module.exports = Normalizer;
