"use strict";

/**
 * Imposta le regole di validazione dei tipi astratti di dati,
 * controlla che i valori ad esso passati siano validati
 */
class Validator{

    constructor(){
        this.emailRegex = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/);
        this.nameRegex = new RegExp(/^[a-zA-Z\s]+$/);
        this.passwordRegex = new RegExp(/^[a-zA-Z0-9]+$/);
        this.priceRegex = new RegExp(/^[0-9]+[.,][0-9]{2,}$/);
        this.quantityRegex = new RegExp(/^[0-9]+$/);

        this.roleList = ["VENDOR","CUSTOMER"];

        this.message = "is not valid";
    }

    validateEmail(email){
        if(!this.emailRegex.test(email))
            throw new Error(`email ${this.message}`);
    }

    validateName(name){
        if(!this.nameRegex.test(name))
            throw new Error(`name ${this.message}`);
    }

    validatePassword(password){
        if(!this.passwordRegex.test(password))
            throw new Error(`password ${this.message}`);
    }

    validatePrice(price){
        if(!this.priceRegex.test(price))
            throw new Error(`price ${this.message}`);
    }

    validateRole(role){
        if(!this.roleList.includes(role))
            throw new Error(`role ${this.message}`);
    }

    validateQuantity(quantity){
        if(!this.quantityRegex.test(quantity) || quantity<0)
            throw new Error(`quantity ${this.message}`);


    }

}

module.exports = Validator;
