'use strict';
const Normalizer = require('../normalize/normalizer.js');

const dao = require('../models/vendor-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore


/**
 * Restituisce la risorsa vendor tramite req.params.username
 */
router.get('/:username', (req,res) => {
  dao.getVendor(req.params.username)
  .then((result) => res.status(200).json(result).end())
  .catch((err) => res.status(503).json({error: err}));
});

/**
 * Restituisce tutti i vendor, se query presente quelli che iniziano con username specificato
 */
router.get('/', (req,res) => {
  dao.searchVendorsByUsername(req.query.username)
  .then((result) => res.status(200).json(result).end())
  .catch((err) => res.status(503).json({error: err}));
});

/**
 * Inserisce un nuovo vendor usando req.body
 */
router.post('/', normalizer.normalizeVendor, (req, res) => {
   
  const description = req.body.description ? req.body.description : "";
  const img = req.body.img ? req.body.img : "none";

  const vendor = {
    "username": req.body.username,
    "password": req.body.password,
    "description": description,
    "img": img,
    "wallet": 0
  }

  dao.createVendor(vendor)
  .then((result) => res.status(result.code).json(result).end())
  .catch((err) => res.status(err.code).json({error: err}));
});

/**
 * Cancella la risorsa vendor se presenta, altri
 */
router.delete('/:username', (req,res) => {
  dao.deleteVendor(req.params.username)
  .then((result) => res.status(result.code).json(result).end())
  .catch((err) => res.status(err.code).json(err));
});

/**
 * Sostiuisce unicamente valore del wallet
 */
router.put('/:username', normalizer.normalizeVendor ,(req,res) => {
  dao.updateWallet(req.params.username, req.body.wallet)
  .then((result) => res.status(result.code).json(result).end())
  .catch((err) => res.status(err.code).json(err));
}

);


module.exports = router;