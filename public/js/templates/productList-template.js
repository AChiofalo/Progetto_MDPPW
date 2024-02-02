"use strict";

import Product from "../product.js";


function showProducts(productList){
    return `    
    <form class="col-md-6 mx-auto" method="GET" id="search_form">  
    <input class="form-control mb-2" id="search" type="text">
    <button id="search_submit" class="btn btn-outline-primary my-2" type="submit">search</button>
    </form>
    
    <ul id="product-list" class="row row-cols-12 g-2 my-2">
                   
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
