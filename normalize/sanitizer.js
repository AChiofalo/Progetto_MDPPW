"use strict";


/**
 * Imposta le regole di sanificazione dei tipi astratti di dati,
 * sanifica i valori passati
 */
class Sanitizer{

    constructor(){}

    /**
     * Restituisce il nome via upperCase e rimuove tutti gli spazi bianchi
     * @param {String} name 
     * @returns name in base a casing
     */
    sanitizeName(name) {
        const res = name.toUpperCase();;
        res = res.replace(/\s/g, ''); //Rimpiazza tutti gli spazi bianchi col secondo parametro, g indica globalmente
        return res;
    }

    /**
     * Restituisce il prezzo in number con le ultime due cifre rappresentanti i centesimi
     * @param {String} price 
     * @returns {Number} price come numero intero: ultime due cifre sono in centesimi
     */
    sanitizePrice(price) {
        const res = price;
        res = res.replace(/\./, '');
        return res-0;
    }


}

export default Sanitizer;