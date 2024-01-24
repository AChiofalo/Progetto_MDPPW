'use strict';
const Normalizer = require('../normalize/normalizer.js');

const dao = require('../models/vendor-dao.js');
const express = require('express');
const router = express.Router();

const path = require('path');

const normalizer = new Normalizer();  //Normalizzatore


/**
 * Restituisce la risorsa vendor tramite req.params.username
 */
router.get('/:username', (req,res) => {
  dao.getVendor(req.params.username)
  .then((result) => res.status(result.code).json(result).end())
  .catch((err) => res.status(err.code).json(err));
});

/**
 * Restituisce tutti i vendor, se query presente quelli che iniziano con username specificato
 */
router.get('/', (req,res) => {
  dao.searchVendorsByUsername(req.query.username?req.query.username:"")
  .then((result) => res.status(result.code).json(result).end())
  .catch((err) => res.status(err.code).json(err));
});

/**
 * Inserisce un nuovo vendor usando req.body
 */
router.post('/', normalizer.normalizeCreateVendor, (req, res) => {
   

  const vendor = {
    "username": req.body.username,
    "password": req.body.password,
    "description": req.body.description,
    "img": `./assets/vendors-img/${req.body.username}`,
    "wallet": 0
  }

  dao.createVendor(vendor)
  .then((result) => res.status(result.code).json(result).end())
  .catch((err) => res.status(err.code).json(err));
});

/**
 * Cancella la risorsa vendor se presente
 */
router.delete('/:username', (req,res) => {
  dao.deleteVendor(req.params.username)
  .then((result) => res.status(result.code).json(result).end())
  .catch((err) => res.status(err.code).json(err));
});

/**
 * Al momento sostiuisce unicamente valore del wallet via "change"
 */
router.patch('/:username', async (req,res) => {

  /*
    TRANSAZIONE...
    ...
    ...
  */
try {
  const resGet = await dao.getVendor(req.params.username);
  const newWallet = resGet.vendor.wallet + req.body.change;
  if(newWallet<0){
    const err = new Error();
    err.msg = "No credit";
    err.code = "400";
    throw err;
  }

  const result = await dao.updateWallet(req.params.username, newWallet);
  res.status(result.code).json(result).end();
}
catch(err){
    res.status(err.code).json(err).end();
}


  
});


//TODO
/*i DAO GET possono tranquillamente restituire l'intera risorsa...sta poi ad una funzione 
  secondaria rimuovere informazioni sensibili
*/

module.exports = router;