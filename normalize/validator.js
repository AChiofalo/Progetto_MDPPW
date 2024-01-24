"use strict";

/**
 * Imposta le regole di validazione dei tipi astratti di dati,
 * controlla che i valori ad esso passati siano validati
 */
class Validator{

    constructor(){
        this.emailRegex = new RegExp(/^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/);
        this.nameRegex = new RegExp(/^[a-zA-Z0-9\s]+$/);
        this.usernameRegex = new RegExp(/^[a-zA-Z\s0-9.]+$/);
        this.passwordRegex = new RegExp(/^[a-zA-Z0-9]+$/);
        this.message = "is not valid";
    }

    validateUsername = (username) => {
        if(!this.usernameRegex.test(username))
            throw new Error(`name ${this.message}`);
    }

    validateEmail = (email) => {
        if(!this.emailRegex.test(email))
            throw new Error(`email ${this.message}`);
    }

    validateName = (name) => {
        if(!this.nameRegex.test(name))
            throw new Error(`name ${this.message}`);
    }

    validatePassword = (password) => {
        if(!this.passwordRegex.test(password))
            throw new Error(`password ${this.message}`);
    }

    validateQuantity = (quantity) => {
        if(!Number.isInteger(quantity))
            throw new Error(`quantity ${this.message}`)
    }

}

module.exports = Validator;
