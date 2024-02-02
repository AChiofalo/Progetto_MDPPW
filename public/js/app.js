"use strict";

import { showNavLinks } from "./templates/navlinks-template.js";

import { showProducts, showProduct } from "./templates/productList-template.js";
import { showProductPage } from "./templates/productPage-template.js"

import { showCart, showCartProduct, showCartCheckOut } from "./templates/cart-template.js";

import { showLogin } from "./templates/login-template.js"
import { showRegister } from "./templates/register-template.js";

import { showAlert } from "./templates/alert-template.js"
//import { showHomepage } from "./templates/homepage-template.js"

import { showBalance } from "./templates/balance-template.js"

import { showAddProduct} from "./templates/addProduct-template.js"
import { showRefillProduct} from "./templates/refillProduct-template.js"



import Api from "./api.js";
import page from "//unpkg.com/page/page.mjs";


class App {

    /**
     * 
     * @param {HTMLHtmlElement} main_element
     * @param {HTMLHtmlElement} navLinks_element 
     */
    constructor(main_element, navLinks_element) {
        this.main_element = main_element;
        this.navLinks_element = navLinks_element;


        //REGISTRAZIONI
        page('/register', () => {
            this.renderAll("sign up", () => showRegister("customer"));

            document.getElementById("register_form").addEventListener('submit', this.registerCustomer);
        });
        page('/join', () => {
            this.renderAll("join us", () => showRegister("vendor"));

            document.getElementById("register_form").addEventListener('submit', this.registerVendor);
        });

        //LOGIN
        page('/login', () => {
            this.renderAll("login", showLogin);

            document.getElementById("login_form").addEventListener('submit', this.login);
        });

        //LOGOUT
        page('/logout', this.logout);

        //CATALOGHI
        page('/products', () => {
            this.renderAll("products", showProducts);
            document.getElementById("search_form").addEventListener('submit', this.loadProductsList);
        });
        page('/products/:name', async (req) => {
            try {
                const product = await Api.getProduct(req.params.name);
                this.renderAll("none", () => showProductPage(product));

                document.getElementById("add_cart").addEventListener('click', () => this.addCart(product));
            } catch (err) {
                page.redirect("/homepage");
            }

        });
        /*page('/vendors', () => {
            this.renderAll("vendors", showVendors);
        });
        */


        //RELATIVI CUSTOMER
        page('/cart', () => {
            this.renderAll("cart", showCart);
            this.loadCartList();
        });

        //RELATIVI VENDOR
        page('/refillproduct', () => {
            this.renderAll("refill", showRefillProduct);
            document.getElementById("refillProduct_form").addEventListener('submit', this.updateQuantity);
        })
        page('/addproduct', () => {
            
            this.renderAll("aggiungi prodotto", showAddProduct);
            document.getElementById("addProduct_form").addEventListener('submit', this.addProduct);

        });

        //RELATIVI VENDOR E CUSTOMER
        page('/balance', () => {
            this.renderAll("balance", ()=>showBalance( localStorage.getItem('wallet')));
            document.getElementById("balance_form").addEventListener('submit', this.modifyBalance);
        });

        //GENERICI ROUTING
        page('/', '/products')
        page('/homepage', '/products')

        page();

    }

    //SESSIONI
    logout = async () => {
        await Api.doLogout();
        clearSessionCache();
        page.redirect('/homepage');
    }
    login = async function (event) {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if (form.checkValidity()) {
            try {
                const user = await Api.doLogin(form.username.value, form.password.value);
                alertMessage.innerHTML = showAlert('success', `Welcome ${user.username}!`);
                const infos = await Api.getPersonalData(user.id, user.role);
                if(user.role == 'VENDOR')
                    user.wallet = infos.vendor.wallet;
                else
                    user.wallet = infos.customer.wallet;
                
                setSessionCache(user);
                setTimeout(() => {
                    alertMessage.innerHTML = "";
                }, 5000);

                page.redirect('/');
            }
            catch (err) {
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(() => alertMessage.innerHTML = '', 5000);
            }

        }
    }


    //REGISTRAZIONE CUSTOMER e VENDOR
    registerCustomer = async function (event) {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if (form.checkValidity()) {
            try {
                const res = await Api.doSignUpCustomer(form.username.value,
                    form.password.value,
                    form.first_name.value,
                    form.last_name.value
                );
                //Rimuove invisibilità logout
                alertMessage.innerHTML = showAlert('success', `${form.username.value} sei registrato con successo!`)
                setTimeout(() => {
                    alertMessage.innerHTML = "";
                }, 5000);

                page.redirect('/');
            }
            catch (err) {
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(() => alertMessage.innerHTML = '', 5000);
            }

        }
    }
    registerVendor = async function (event) {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if (form.checkValidity()) {
            try {
                const res = await Api.doSignUpVendor(form.username.value,
                    form.password.value,
                    form.name.value,
                    form.description.value
                );
                //Rimuove invisibilità logout
                alertMessage.innerHTML = showAlert('success', `${form.username.value} sei registrato con successo!`)
                setTimeout(() => {
                    alertMessage.innerHTML = "";
                }, 5000);

                page.redirect('/');
            }
            catch (err) {
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(() => alertMessage.innerHTML = '', 5000);
            }

        }
    }

    //GESTIONE PRODOTTI VENDOR
    addProduct = async function (event) {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if (form.checkValidity()) {
            try {
                const res = await Api.doAddProduct(form.name.value,
                    form.description.value,
                    form.quantity_available.value,
                    form.price.value
                );

                alertMessage.innerHTML = showAlert('success', res)
                setTimeout(() => {
                    alertMessage.innerHTML = "";
                }, 5000);

                page.redirect('/');
            }
            catch (err) {
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(() => alertMessage.innerHTML = '', 5000);
            }

        }
    }

    updateQuantity = async function (event) {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if (form.checkValidity()) {
            try {
                const res = await Api.doUpdateQuantity(form.name.value,
                    form.change.value
                );

                alertMessage.innerHTML = showAlert('success', res.msg)
                setTimeout(() => {
                    alertMessage.innerHTML = "";
                }, 5000);

                page.redirect('/');
            }
            catch (err) {
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(() => alertMessage.innerHTML = '', 5000);
            }

        }
    }



        
    
    //PER CATALOGO
    loadProductsList = async function (event) {
        event.preventDefault();
        const form = event.target;
        const search = form.search.value;

        try {
            const res = await Api.getProducts(search); //Query da aggiungere

            const list = document.querySelector('#product-list');

            list.innerHTML = '';

            res.forEach((product) => {
                list.insertAdjacentHTML('beforeend', showProduct(product))
            });

        }
        catch (err) {
            const errorMsg = err;
        }

    }


    //CARRELLO
    loadCartList = async function () {

        try {
            const products = getCartCache();
            const list = document.querySelector('#cart-list');
            let totPrice = 0;
            if(products)
                products.forEach((product) => {
                    list.insertAdjacentHTML('afterbegin', showCartProduct(product));
                    totPrice += product.price
                });
            list.insertAdjacentHTML('beforeend', showCartCheckOut(totPrice));
            document.getElementById("checkout_cart").addEventListener('click',() => this.checkOut(totPrice));
            document.getElementById("delete_cart").addEventListener('click', this.deleteCart);
            

        }
        catch (err) {
            const errorMsg = err;
        }

    }
    addCart = async function (product) {
        try {

            let cart = getCartCache();
            if(!cart)
                setCartCache([]);
            cart.push(product);
            setCartCache(cart);
        }
        catch (err) {
            const errorMsg = err;
        }
    }
    deleteCart = async function () {
        setCartCache([]);
        page.redirect('/');
    }
    checkOut = async function (change) {
        let cart = getCartCache();
        const alertMessage = document.getElementById('alert-message');

        let flowCart = cart.map((val) => val.id);
      

        try {
            if(localStorage.getItem('role')!='customer'){
                throw new Error("Autenticati come cliente prima");
            }

            const res = await Api.doCheckOut(flowCart);
            alertMessage.innerHTML = showAlert('success', `Wallet modificato`);

            //Aggiornamento rapido e fallace client
            const precW = Number.parseInt(localStorage.getItem('wallet'));
            const newW = precW + (-change)
            localStorage.setItem('wallet', newW);

            setCartCache([]);
        } catch (err) {
            const errorMsg = err;
            alertMessage.innerHTML = showAlert('danger', errorMsg);

        } finally{
            setTimeout(() => alertMessage.innerHTML = '', 5000);
            page.redirect('/');
        }

    }

    //SALDO
    modifyBalance = async function (event) {
        event.preventDefault();
        const form = event.target;
        const alertMessage = document.getElementById('alert-message');

        if (form.checkValidity()) {
            try {
                const res = await Api.doChangeWallet(form.change.value, localStorage.getItem('role'));
                alertMessage.innerHTML = showAlert('success', `Modificato di ${form.change.value}`)
                setTimeout(() => {
                    alertMessage.innerHTML = "";
                }, 5000);
                //Aggiornamento client per non eseguire nuova fetch
                const precW = Number.parseInt(localStorage.getItem('wallet'));
                const newW = precW + Number.parseInt(form.change.value)
                localStorage.setItem('wallet', newW);
                //
                page.redirect('/');
            }
            catch (err) {
                const errorMsg = err;
                alertMessage.innerHTML = showAlert('danger', errorMsg);

                setTimeout(() => alertMessage.innerHTML = '', 5000);
            }

        }
    };

    




    //SUPPORTO GRAFICO
    /**
     * Gestione grafica navbar e main statico per pagina
     * @param {String} activePage - Nome della pagina attiva al momento
     * @param {Function} showPage - Funzione per mostrare la pagina
     */
    renderAll(activePage, showPage) {
        this.renderNavBar(activePage, localStorage.getItem("role"));
        this.renderMain(showPage);
    }

    /**
     * Funzione supporto caricamento navBar
     * @param {String} active - Nome della pagina attiva al momento
     *@param {String} role -  vendor o customer
     */
    renderNavBar(active, role) {
        this.navLinks_element.innerHTML = '';
        this.navLinks_element.insertAdjacentHTML("beforeend", showNavLinks(active, role));
    }

    /**
     * Funzione supporto caricamento main
     * @param {Function} creator - Funzione per renderizzare la pagina
     */
    renderMain(creator) {
        this.main_element.innerHTML = '';
        this.main_element.insertAdjacentHTML("beforeend", creator());
    }


}


//FUNZIONI SUPPORTO PER SESSIONE


function setSessionCache(user) {
    localStorage.setItem('username', user.username); //!!!
    localStorage.setItem('id', user.id);
    localStorage.setItem('role', user.role.toLowerCase());
    localStorage.setItem('wallet', user.wallet);
}

function clearSessionCache() {
    localStorage.removeItem('username'); //!!!
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('wallet');
}

function setCartCache(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getCartCache() {
    return JSON.parse(localStorage.getItem('cart'));
}


export default App;

