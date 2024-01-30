"use strict";

function showRegister(role){
    return `
    <form method="POST" action="" class="col-md-6 mx-auto" id="register_form">  
    <label class="form-label my-2" for="username">Username</label> 
    <input class="form-control mb-2" id="username" type="text" placeholder="Marioo7" required>
    
    <label class="form-label my-2" for="password">Password</label> 
    <input class="form-control mb-2" id="password" type="password" required>

    ${role==='vendor'?showVendor():showCustomer()}




    <button id="register_submit" class="btn btn-outline-primary my-2" type="submit">Register</button>
</form>`
}

function showVendor(){
    return `<label class="form-label my-2" for="name">Name</label> 
    <input class="form-control mb-2" id="name" type="text" required>

    <label class="form-label my-2" for="description">Description</label> 
    <input class="form-control mb-2" id="description" type="text" required>`

}

function showCustomer(){
    return `<label class="form-label my-2" for="first_name">First Name</label> 
    <input class="form-control mb-2" id="first_name" type="text" required>

    <label class="form-label my-2" for="last_name">Last Name</label> 
    <input class="form-control mb-2" id="last_name" type="text" required>`

}

export {showRegister};  