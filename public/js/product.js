"use strict";

/**
 * Utilità per costruire product
 */
class Product {


    constructor(id, name, vendor_id, description, quantity_available, price) {
        this.id = id;
        this.name = name;
        this.vendor_id = vendor_id;
        this.description = description;
        this.quantity_available = quantity_available;
        this.price = price;
    }

    /**
     * 
     * @param {Object} json to build product 
     */
    static from(json){
        return new Product(
            json.id,
            json.name,
            json.vendor_id,
            json.description, 
            json.quantity_available,
            json.price
        ); 
    }
}



export default Product;  