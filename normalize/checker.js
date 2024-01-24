/**
 * Controlla che le etichette dei campi siano corrette
 */
class Checker{
    constructor(){
        this.createVendorKeys = ["username","password","description"];
        this.msg = "wrong keys!";
    }

    /**
     * 
     * @param {Object} vendor 
     */
    checkCreateVendor = (body) => {
        const bodyKeys = Object.keys(body);
        if(bodyKeys.length != this.createVendorKeys.length)
            throw new Error(this.msg);
        if(!bodyKeys.every((val) => this.createVendorKeys.includes(val)))
            throw new Error(this.msg);
    }
}

module.exports = Checker;
