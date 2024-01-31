"use strict";

import Product from "../product.js";


function showProducts(productList){
    return `    <ul id="product-list" class="row row-cols-12 g-2 my-2">
                </ul>`
}

function showProduct(product){
    return ` 
            <li class="col clickableItem">
            <div> 
                <a href="/products/${product.name}">${product.name}  ${product.price/100},${product.price%100} €</a>
                </div>
            </li>`
}

export {showProducts, showProduct} 
