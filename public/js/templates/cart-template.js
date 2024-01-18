"use strict";

function showCart(){
    
    let res = "";
    if(sessionStorage.getItem("hasCart"))
        res = ``
    else
        res = `<h2>Nessun Oggetto</h2>`
    return res;
}



export {showCart}   