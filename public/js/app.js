"use strict";

import {showNavLinks} from "./templates/navlinks-template.js";

//import {showProduct} from "./templates/product-template.js";
import {showProducts,showProduct} from "./templates/productList-template.js";

import {showVendors} from "./templates/vendors-template.js";

import {showCart} from "./templates/cart-template.js";

import {showLogin} from "./templates/login-template.js"
import {showRegister} from "./templates/register-template.js";
import {showAlert} from "./templates/alert-template.js"
import {showHomepage} from "./templates/homepage-template.js"

import {showProductPage} from "./templates/productPage-template.js"

import Api from "./api.js";
import page from "//unpkg.com/page/page.mjs";


class App {

    /**
     * 
     * @param {HTMLHtmlElement} main_element
     * @param {HTMLHtmlElement} navLinks_element 
     */
    constructor(main_element, navLinks_element){
        this.main_element = main_element;
        this.navLinks_element = navLinks_element;
    
        //REGISTRAZIONI
        page('/register', () => {   
            this.renderAll("sign up",()=>showRegister("customer"));

            document.getElementById("register_form").addEventListener('submit',  this.registerCustomer);
        });
        page('/join', () => {
            this.renderAll("join us",()=>showRegister("vendor"));

            document.getElementById("register_form").addEventListener('submit',  this.registerVendor);
        });

        //LOGIN
        page('/login', () => {
            this.renderAll("login", showLogin);

            document.getElementById("login_form").addEventListener('submit',  this.login);
        });

        //LOGOUT
        page('/logout', this.logout);

        //CATALOGHI
        page('/products', () => {
            this.renderAll("products", showProducts);
            this.loadProductsList()
        });
        page('/products/:name', async (req) => {
            try {
                const product = await Api.getProduct(req.params.name);
                this.renderAll("none", () => showProductPage(product));
            } catch(err) {
                page.redirect("/homepage");
            }

        });
        page('/vendors', () => {    
            this.renderAll("vendors", showVendors);
        });



        //RELATIVI A RUOLO
        page('/cart', () => {
            this.renderAll("cart", showCart);
        });
        page('/myproducts',()=>{
        });

        //GENERICI
        page('/', () => {   
            
            this.renderAll("none", showHomepage);

        });
        page('/homepage', '/'); //Rimuove Homepage? Non so cosa metterci...

        page();
        
    }

    /**
     * Perform the logout
     */
    logout = async () => {
        await Api.doLogout();
        clearSessionCache();
        page.redirect('/homepage');
    }

    login = async function(event){
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if(form.checkValidity()) {
            try {
                const user = await Api.doLogin(form.username.value, form.password.value);

                alertMessage.innerHTML = showAlert('success',`Welcome ${user.username}!`);
                setSessionCache(user);
                setTimeout(()=>{
                    alertMessage.innerHTML = "";
                }, 5000);   
                 
                page.redirect('/');
            }
            catch(err){
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(()=> alertMessage.innerHTML = '', 5000);
            }

        }
    }

    registerCustomer = async function(event){
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if(form.checkValidity()) {
            try {
                const res = await Api.doSignUpCustomer(form.username.value, 
                    form.password.value, 
                    form.first_name.value,
                    form.last_name.value
                    );
                //Rimuove invisibilità logout
                alertMessage.innerHTML = showAlert('success', res)
                setTimeout(()=>{
                    alertMessage.innerHTML = "";
                }, 5000);   
                 
                page.redirect('/');
            }
            catch(err){
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(()=> alertMessage.innerHTML = '', 5000);
            }

        }
    }
    
    registerVendor = async function(event){
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if(form.checkValidity()) {
            try {
                const res = await Api.doSignUpVendor(form.username.value, 
                    form.password.value, 
                    form.name.value,
                    form.description.value
                    );
                //Rimuove invisibilità logout
                alertMessage.innerHTML = showAlert('success', res)
                setTimeout(()=>{
                    alertMessage.innerHTML = "";
                }, 5000);   
                 
                page.redirect('/');
            }
            catch(err){
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(()=> alertMessage.innerHTML = '', 5000);
            }

        }
    }

    loadProductsList = async function(){

            try {
                const res = await Api.getProducts(null); //Query da aggiungere
                 
                const list = document.querySelector('#product-list');
                res.forEach((product)=>{
                    list.insertAdjacentHTML('afterbegin',showProduct(product))
                }); 



            }
            catch(err){
                const errorMsg = err;
            }

        }


    /**
     * @param {String} activePage - Nome della pagina attiva al momento
     * @param {Function} showPage - Funzione per mostrare la pagina
     */
    renderAll(activePage, showPage){
        this.renderNavBar(activePage, localStorage.getItem("role"));
        this.renderMain(showPage);
    }

    /**
     * 
     * @param {String} active - Nome della pagina attiva al momento
     *@param {String} role -  vendor o customer
     */
    renderNavBar(active, role){
        this.navLinks_element.innerHTML = '';
        this.navLinks_element.insertAdjacentHTML("beforeend", showNavLinks(active, role));
    }

    /**
     * 
     * @param {Function} creator - Funzione per renderizzare la pagina
     */
    renderMain(creator){
        this.main_element.innerHTML = '';
        this.main_element.insertAdjacentHTML("beforeend", creator());
    }
}

function setSessionCache(user){
    localStorage.setItem('username', user.username); //!!!
    localStorage.setItem('id', user.id);
    localStorage.setItem('role', user.role.toLowerCase());
}

function clearSessionCache(){
    localStorage.removeItem('username'); //!!!
    localStorage.removeItem('id');
    localStorage.removeItem('role');
}


export default App;

