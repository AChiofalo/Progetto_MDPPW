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
            this.validator.validatePassword(req.body.password);
            this.validator.validateName(req.body.name);

            req.body.username = this.sanitizer.sanitizeUsername(req.body.username);
            req.body.name = this.sanitizer.sanitizeName(req.body.name);

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

    normalizeUpdateQuantity = (req, res, next) => {
        try {
            this.checker.checkUpdateQuantity(req.body);
            this.validator.validateQuantity(req.body.change);

            return next();
            
        } catch(err){
            res.status(400).json({"code" : 400, "msg" : err.message});
        }
    }

    normalizeCreateCustomer = (req, res, next) => {
        try {

            this.checker.checkCreateCustomer(req.body);
            this.validator.validateUsername(req.body.username);
            this.validator.validatePassword(req.body.password);
            this.validator.validateName(req.body.first_name);
            this.validator.validateName(req.body.last_name);


            req.body.first_name = this.sanitizer.sanitizeName(req.body.first_name);
            req.body.last_name = this.sanitizer.sanitizeName(req.body.last_name);

            return next();

        } catch(err){
            res.status(400).json({"code" : 400, "msg" : err.message});
        }
    }

    normalizeCreateUser = (req, res, next) => {
        try {
            this.checker.checkCreateUser(req.body);

            this.validator.validateUsername(req.body.username);
            this.validator.validatePassword(req.body.password);
            this.validator.validateRole(req.body.role);

            req.body.username = this.sanitizer.sanitizeUsername(req.body.username);
            req.body.role = this.sanitizer.sanitizeRole(req.body.role);

            return next();
        }
        catch(err){
            res.status(400).json({"code" : 400, "msg" : err.message});
        }
    }


}

module.exports = Normalizer;
