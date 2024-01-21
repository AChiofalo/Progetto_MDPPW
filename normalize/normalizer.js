"use strict";

import Validator from "./validator";
import Sanitizer from "./sanitizer";

class Normalizer{
    constructor(){
        this.validator = new Validator();
        this.sanitizer = new Validator();
    }

    normalizeUser(req, res, next){
        try {
            this.validator.validateEmail(req.body.username);
            req.body.username = this.sanitizer.validateEmail(req.body.username)

            req.body.role = this.sanitizer.roleList(req.body.role)
            this.validator.validateRole(req.body.role);
        } catch(err){
            res.status(400).json({"statusCode" : 400, "message" : err});
        }

    }

    normalizeVendor(req, res, next){
        try {
            this.validator.validateName(req.body.name);
            this.validator.validatePrice(req.body.wallet);

            req.body.name = this.sanitizer.validateName(req.body.name);
            req.body.wallet = this.sanitizer.validatePrice(req.body.wallet);
            
        } catch(err){
            res.status(400).json({"statusCode" : 400, "message" : err});
        }


    }


}