"use strict";

import Product from "./product.js"; 


class Supply{
    constructor(product, endDate){
        this.product = product;
        this.endDate = endDate;
    }

    static from(json){
        return new Supply(
            Product.from(json.product),

            json.endDate
        );
    }
}



export default Supply;