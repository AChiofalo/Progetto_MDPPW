/**
 * Controlla che le chiavi dei campi del request body siano corrette
 */
class Checker{
    constructor(){
        this.createVendorKeys = ["username","password","name","description"];
        this.createProductKeys = ["name","vendor_username","description","quantity_available","price"];
        this.updateQuantityKeys = ["change"];
        this.createUserKeys = ["username","password","role"]; //Non usata al momento, creazione via vendor e customer
        this.msg = "wrong keys!";
    }

    checkCreateVendor = body => {
        const err = baseCheck(body, this.createVendorKeys, this.msg)
        if(err)
            throw err;
    }

    checkCreateProduct = body => {
        const err = baseCheck(body, this.createProductKeys, this.msg)
        if(err)
            throw err;
    }

    checkUpdateQuantity = body => {
        const err = baseCheck(body, this.updateQuantityKeys, this.msg)
        if(err)
            throw err;
    }

    checkCreateUser = body => {
        const err = baseCheck(body, this.createUserKeys, this.msg)
        if(err)
            throw err;
    }
}

/**
 * Controlla che i campi body siano quelli excpected
 * 
 * @param {Request.body} body 
 * @param {Array} expected 
 * @param {String} msg 
 */
function baseCheck(body,expected,msg) {
    const bodyKeys = Object.keys(body);
    if(bodyKeys.length != expected.length) 
        return new Error(msg);
    if(!bodyKeys.every((val) => expected.includes(val)))
        return new Error(msg);
}

module.exports = Checker;
