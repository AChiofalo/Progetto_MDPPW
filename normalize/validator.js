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
    }

    validateEmail(email){
        if(this.emailRegex.test(email))
            return true;
        else
            throw new Error("email not valid");
    }

    validateName(name){
        if(this.nameRegex.test(name))
            return true;
        else
            throw new Error("name not valid");
    }

    validatePassword(password){
        if(this.passwordRegex.test(password))
            return true;
        else
            throw new Error("password not valid");
    }

    validatePrice(price){
        if(this.priceRegex.test(price))
            return true;
        else
            throw new Error("price not valid");
    }

}

export default Validator