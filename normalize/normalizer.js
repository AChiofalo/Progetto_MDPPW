"use strict";

import Validator from "./validator";
import Sanitizer from "./sanitizer";

class Normalizer{
    constructor(){
        this.validator = new Validator();
        this.sanitizer = new Sanitizer();
    }

    normalizeUser(req, res, next){
        try {
            this.validator.validateEmail(req.body.username);
            req.body.username = this.sanitizer.sanitizeEmail(req.body.username)

            return next();

        } catch(err){
            res.status(400).json({"statusCode" : 400, "message" : err});
        }

    }

    normalizeVendor(req, res, next){
        try {
            this.validator.validateName(req.body.name);
            this.validator.validatePrice(req.body.wallet);

            req.body.name = this.sanitizer.sanitizePrice(req.body.name);
            req.body.wallet = this.sanitizer.sanitizePrice(req.body.wallet);

            return next();

        } catch(err){
            res.status(400).json({"statusCode" : 400, "message" : err});
        }


    }

    normalizeCustomer(req, res, next){
        try {
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

    normalizeProduct(req, res, next){
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
}

export default Normalizer