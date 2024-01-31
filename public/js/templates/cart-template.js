"use strict";

function showCart(){
    
    let res = "";
    if(localStorage.getItem("hasCart"))
        res = ``
    else
        res = `<h2>Nessun Oggetto</h2>`
    return res;
}



export {showCart}   