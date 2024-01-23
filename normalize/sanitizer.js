"use strict";



/**
 * Imposta le regole di sanificazione dei tipi astratti di dati,
 * sanifica i valori passati
 */
class Sanitizer{

    constructor(){}

        /**
     * Restituisce nome in lowerCase
     * @param {String} username 
     * @returns username in lowerCase
     */
    sanitizeUsername = (username) => {
        let res = username.toLowerCase();;
        return res;
    }

    /**
     * Restituisce nome in upperCase e rimuove tutti gli spazi bianchi
     * @param {String} name 
     * @returns name in upperCase
     */
    sanitizeName = (name) => {
        let res = name.toUpperCase();;
        res = res.replace(/\s/g, ''); //Rimpiazza tutti gli spazi bianchi col secondo parametro, g indica globalmente
        return res;
    }

    /**
     * Restituisce il prezzo in number con le ultime due cifre rappresentanti i centesimi
     * @param {String} price 
     * @returns {Number} price come numero intero: ultime due cifre sono in centesimi
     */
    sanitizePrice = (price) => {
        let res = price;
        res = res.replace(/\./, '');
        return res-0;
    }

    /**
     * Restituisce email in upperCase
     * @param {String} email 
     * @returns email in upperCase
     */
    sanitizeEmail = (email) => {
        return email.toUpperCase();;
    }

    /**
     * Restituisce role in upperCase
     * @param {String} role 
     * @returns role in upperCase
     */
    sanitizeRole = (role) => {
        return role.toUpperCase();;
    }


}

module.exports = Sanitizer;


