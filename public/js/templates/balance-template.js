"use strict"

function showBalance(balance){
    return `
    <h1">Saldo ${balance/100},${balance%100} €</h1>

    <form method="POST" action="" class="col-md-6 mx-auto" id="balance_form">  

    <label class="form-label my-2" for="change"> Modifica Saldo (centesimi) </label> 
    <input class="form-control mb-2" id="change" type="number" required>


    <button id="balance" class="btn btn-outline-primary my-2" type="submit">Modifica</button>
</form>`
}

export {showBalance};