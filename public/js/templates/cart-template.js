"use strict";

function showCart(){
    
    return `<ul id="cart-list">
            </ul>`
}
function showCartProduct(product){

    return `<li class="clickableItem row row-cols-1 row-cols-lg-2 g-2 my-2">
                <p> ${product.name}  ${product.price/100},${product.price%100} €</p>
            </li>`
}





function showCartCheckOut(price){
    return `<div class="row row-cols-1 row-cols-lg-3 g-2 my-2 mx-2">
             <h2 class="col-1">TOT: ${price/100},${price%100} €</h2>
            <input id="checkout_cart" class="col-6 btn btn-primary" type="button" value="Checkout">
            <input id="delete_cart" class="col-6 btn btn-secondary" type="button" value="Delete Cart">
            </div>
            `
}





export {showCart, showCartProduct, showCartCheckOut}   