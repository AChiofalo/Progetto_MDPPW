"use strict";

import Product from "../product.js";

/**
 * 
 * @param {Product} product 
 * @returns 
 */
function showProduct(product){
    return `<div class="row row-cols-1 row-cols-lg-2 g-2 my-2">
            <div class="col">
                <img class="img-fluid" src="${product.img}">
            </div>
            <div class="col">
                <h2 class="product-name">${product.name}</h2>
                <p class="product-description"> ${product.description}</p>
                <div class="container-sm">
                    <div class="row row-cols-1 row-cols-lg-2 g-2 my-2">
                        <h2 class="col-6 product-price">${product.price}</h2>
                        <input class="col-6 btn btn-primary" type="button" value="Aggiungi al carrello"> 
                    </div>
                </div>

                
            </div>
        </div>
        <dl class="row g-2 my-2">
           ${addDetails(product)}
        </dl>
            
            
    `
}

/**
 * 
 * @param {Product} product 
 */
function addDetails(product){
    let res = "";
    for(const i in product){
        res += `<dt class="col-sm-3">${i}</dt>` 
        res += `<dd class="col-sm-9">${product[i]}</dd>`
    }
    return res;
}

export {showProduct}  