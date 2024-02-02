"use strict"

function showAddProduct(){
    return `
    <form method="POST" action="" class="col-md-6 mx-auto" id="addProduct_form">  
    <label class="form-label my-2" for="name">nome</label> 
    <input class="form-control mb-2" id="name" type="text" required>
    
    <label class="form-label my-2" for="description">descrizione</label> 
    <input class="form-control mb-2" id="description" type="text" required>

    <label class="form-label my-2" for="quantity_available">quantità</label> 
    <input class="form-control mb-2" id="quantity_available" type="number" required>

    <label class="form-label my-2" for="price">prezzo (centesimi) </label> 
    <input class="form-control mb-2" id="price" type="number" required>


    <button id="addProduct_submit" class="btn btn-outline-primary my-2" type="submit">Aggiungi</button>
</form>`
}

export {showAddProduct};