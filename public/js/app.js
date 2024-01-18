"use strict";

import {showNavLinks} from "./templates/navlinks-template.js";

import {showProduct} from "./templates/product-template.js";
import {showProducts} from "./templates/products-template.js";

import {showVendors} from "./templates/vendors-template.js";

import {showCart} from "./templates/cart-template.js";

import {showLogin} from "./templates/login-template.js"
import {showRegister} from "./templates/register-template.js";
import {showAlert} from "./templates/alert-template.js"
import {showHomepage} from "./templates/homepage-template.js"

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

    


        page('/products', () => {
            this.renderAll("products", showProducts);
        });

        page('/products/:id', async (ctx) => {
            try {
                const product = await Api.getProduct(ctx.params.id);
                this.renderAll("none", () => showProduct(product));
            } catch(err) {
                page.redirect("/homepage");
            }

        });

        page('/vendors', () => {    
            this.renderAll("vendors", showVendors);
        })

        page('/cart', () => {
            this.renderAll("cart", showCart);
        });



        page('/login', () => {
            this.renderAll("login", showLogin);

            document.getElementById("login_form").addEventListener('submit',  this.login);
        });

        page('/register', () => {   
            this.renderAll("sign up", showRegister);
        });

        page('/', () => {
            this.renderAll("none", showHomepage);
        });

        page('/homepage', '/');

        page('*', '/');

        page();
        
    }



    login = async function(event){
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if(form.checkValidity()) {
            try {
                const user = await Api.doLogin(form.email_input.value, form.password_input.value);
                //Rimuove invisibilità logout
                alertMessage.innerHTML = showAlert('success',`Welcome ${user}!`)
                localStorage.setItem('isLoggedIn', 'true'); //!!!
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

    /**
     * @param {String} activePage - Nome della pagina attiva al momento
     * @param {Function} showPage - Funzione per mostrare la pagina
     */
    renderAll(activePage, showPage){
        this.renderNavBar(activePage);
        this.renderMain(showPage);
    }

    /**
     * 
     * @param {String} active - Nome della pagina attiva al momento
     */
    renderNavBar(active){
        this.navLinks_element.innerHTML = '';
        this.navLinks_element.insertAdjacentHTML("beforeend", showNavLinks(active));
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

export default App;

