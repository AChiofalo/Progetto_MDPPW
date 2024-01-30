"use strict";

/**
 * 
 * @param {String} link attivo 
 * @returns lista navlinks HTML
 */
function showNavLinks(active, role){

    //Per evitare di passare altri parametri al main inserisco anche le liste qui
    return `
                <ul class="navbar-nav flex-wrap" id="nav_links_items">
                    ${showCatalogLinks(active)}
                </ul>

                <ul class="navbar-nav ml-auto  flex-wrap  ms-md-auto">
                    ${showSessionLinks(active,role)}                
                </ul> 
                `
}
                

/**
 * 
 * @param {String} active - link attivo
 * @returns 
 */
function showCatalogLinks(active){

    return `<a class="nav-link ${active==='products' ? 'active' : ''}" ${active==='products' ? 'aria-current="page"' : ''} href="/products">Prodotti</a> 
            <a class="nav-link ${active==='vendors' ? 'active' : ''}" ${active==='vendors' ? 'aria-current="page"' : ''} href="/vendors">Venditori</a> `
}

function showSessionLinks(active,role){
    
    //Caso Utente Loggato
    if(role)
        return `${showUserLinks(active,role)}
                <a class="nav-link" href="/logout" id="logout_link">Logout</a> 
                ` 
    

    //Caso Utente NON Loggato
    return `${showCartLink(active)}
            <a class="nav-link ${active==='login' ? 'active' : ''}" ${active==='login' ? 'aria-current="page"' : ''} href="/login">Login</a>
            <a class="nav-link ${active==='sign up' ? 'active' : ''}" ${active==='sign up' ? 'aria-current="page"' : ''} href="/register">Sign Up</a>
            <a class="nav-link ${active==='join us' ? 'active' : ''}" ${active==='join us' ? 'aria-current="page"' : ''} href="/join">Join Us</a>`     

 }

function showUserLinks(active,role){
    //Caso Vendor
    if(role==='vendor')
        return `<a class="nav-link ${active==='my products' ? 'active' : ''}" ${active==='my products' ? 'aria-current="page"' : ''} href="/myproducts">
                    I miei prodotti
                </a> `
    
    //Caso Customer
    return showCartLink(active)

}

//Per utente customer loggato e per i NON loggati
function showCartLink(active){
    return  `<a class="nav-link ${active==='cart' ? 'active' : ''}" ${active==='cart' ? 'aria-current="page"' : ''} href="/cart">
    Carrello
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
    </svg>
    </a> `
}


export {showNavLinks}