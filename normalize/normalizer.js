"use strict";

const Validator = require('./validator.js');
const Sanitizer = require('./sanitizer.js');


class Normalizer{   
    constructor(){
        this.validator = new Validator();
        this.sanitizer = new Sanitizer();
    }



    normalizeVendor = (req, res, next) => {
        try {
            this.validator.validateUsername(req.body.username);

            req.body.username = this.sanitizer.sanitizeUsername(req.body.username);
            //this.validator.validatePrice(req.body.wallet);


            //req.body.wallet = this.sanitizer.sanitizePrice(req.body.wallet);

            return next();
            
        } catch(err){
            res.status(400).json({"statusCode" : 400, "message" : err.message});
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
            res.status(400).json({"statusCode" : 400, "message" : err});
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
            res.status(400).json({"statusCode" : 400, "message" : err});
        }
    }

        /*normalizeUser = (req, res, next) => {
        try {
            this.validator.validateEmail(req.body.username);
            req.body.username = this.sanitizer.sanitizeEmail(req.body.username)

            return next();

        } catch(err){
            res.status(400).json({"statusCode" : 400, "message" : err});
        }

    }*/

}

module.exports = Normalizer;
