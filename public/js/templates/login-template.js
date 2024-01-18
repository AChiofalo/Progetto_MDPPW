"use strict";

function showLogin(){
    return `
    <form class="col-md-6 mx-auto" method="POST" id="login_form">  

    <label class="form-label my-2" for="email_input">Indirizzo Email</label> 
    <input class="form-control mb-2" id="email_input" type="email" required>


    <label class="form-label my-2" for="password_input">Password</label> 
    <input class="form-control mb-2" id="password_input" type="password" required>

    <button id="login_submit" class="btn btn-outline-primary my-2" type="submit">Login</button>
    </form>`
}

export {showLogin};