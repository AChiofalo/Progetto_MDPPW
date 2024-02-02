"use strict"

function showRefillProduct(){
    return `

    <form method="POST" action="" class="col-md-6 mx-auto" id="refillProduct_form">  

    <label class="form-label my-2" for="name"> Nome Prodotto </label> 
    <input class="form-control mb-2" id="name" type="text" required>

    <label class="form-label my-2" for="change"> Cambiamento </label> 
    <input class="form-control mb-2" id="change" type="number" required>


    <button id="refill" class="btn btn-outline-primary my-2" type="submit">Modifica</button>
</form>`
}

export {showRefillProduct}