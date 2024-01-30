"use strict";

function showLogin(){
    return `
    <form class="col-md-6 mx-auto" method="POST" id="login_form">  

    <label class="form-label my-2" for="username">Username</label> 
    <input class="form-control mb-2" id="username" type="text" required>


    <label class="form-label my-2" for="password">Password</label> 
    <input class="form-control mb-2" id="password" type="password" required>

    <button id="login_submit" class="btn btn-outline-primary my-2" type="submit">Login</button>
    </form>`
}

export {showLogin};