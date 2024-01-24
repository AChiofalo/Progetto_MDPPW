/**
 * Controlla che le chiavi dei campi del request body siano corrette
 */
class Checker{
    constructor(){
        this.createVendorKeys = ["username","password","description"];
        this.updateQuantityKeys = ["change"];
        this.msg = "wrong keys!";
    }

    checkCreateVendor = body => {
        const err = baseCheck(body, this.createVendorKeys, this.msg)
        if(err)
            throw err;
    }

    checkUpdateQuantity = body => {
        const err = baseCheck(body, this.updateQuantityKeys, this.msg)
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
