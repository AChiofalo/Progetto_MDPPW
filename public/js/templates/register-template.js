"use strict";

function showRegister(){
    return `
    <form method="POST" action="" class="col-md-6 mx-auto">  
    <label class="form-label my-2" for="email_input">Indirizzo Email</label> 
    <input class="form-control mb-2" id="email_input" type="email" placeholder="esempio@es.com" required>

    <label class="form-label my-2" for="email_confirm_input">Conferma Email</label> 
    <input class="form-control mb-2" id="email_confirm_input" type="email" required>


    <label class="form-label my-2" for="password_input">Password</label> 
    <input class="form-control mb-2" id="password_input" type="password" required>

    <label class="form-label my-2" for="password_confirm_input">Conferma Password</label> 
    <input class="form-control mb-2" id="password_confirm_input" type="password" required>

    <button id="register_submit" class="btn btn-outline-primary my-2" type="submit">Register</button>
</form>`
}

export {showRegister};  