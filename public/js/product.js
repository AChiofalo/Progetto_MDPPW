"use strict";

class Product {


    constructor(id, vendorId, name, description, keywords, origin, color, img, quantityAvailable, price) {
        this.id = id;
        this.vendorId = vendorId;
        this.name = name;
        this.description = description;
        this.keywords = keywords;
        this.origin = origin;
        this.color = color;
        this.img = img
        this.quantityAvailable = quantityAvailable;
        this.price = price;
    }

    /**
     * 
     * @param {Object} json to build product 
     */
    static from(json){
        return new Product(
            json.id,
            json.vendorId,
            json.name,
            json.description, 
            json.keywords,
            json.origin, 
            json.color,
            json.img,
            json.quantityAvailable,
            json.price
        ); 
    }
}



export default Product;  