"use strict";

/**
 * Utilità per costruire un eventuale vendor
 */
class Vendor{

    constructor(id, name, description){
        this.id = id;
        this.name = name;
        this.description = description;
    }

    static from(json){
        return new Product(
            json.id,
            json.name,
            json.description, 
        ); 
    }
}

export default Vendor;