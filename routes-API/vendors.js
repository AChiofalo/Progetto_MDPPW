'use strict';
const Normalizer = require('../normalize/normalizer.js');

const dao = require('../models/vendor-dao.js');
const userDao = require('../models/user-dao.js');
const express = require('express');
const router = express.Router();
const authSupp = require('../auth-support.js');


const normalizer = new Normalizer();  //Normalizzatore


/**
 * Restituisce la risorsa vendor tramite req.params.name
 */
router.get('/:name', (req, res) => {
  dao.getVendor(req.params.name)
    .then((result) => res.status(result.code).json(result).end())
    .catch((err) => res.status(err.code).json(err));
});

/**
 * Restituisce tutti i vendor, se query presente quelli che iniziano con name specificato: /?name=<val>
 */
router.get('/', (req, res) => {
  dao.searchVendorsByName(req.query.name ? req.query.name : "")
    .then((result) => res.status(result.code).json(result).end())
    .catch((err) => res.status(err.code).json(err));
});

/**
 * SIGN UP per Vendors
 * Inserisce un nuovo vendor ed user usando req.body
 */
router.post('/', normalizer.normalizeCreateVendor, async (req, res) => {

  const user = {
    "username": req.body.username,
    "password": req.body.password,
    "role": "VENDOR"
  }

  const vendor = {
    "name": req.body.name,
    "description": req.body.description,
    "img": `./assets/vendors-img/${req.body.name}`,
    "wallet": 0
  }

  try {
    const userRes = await userDao.createUser(user);
    vendor["id"] = userRes.id;
    const vendorRes = await dao.createVendor(vendor); //user potrebbe essere creato al contrario di vendor!
    res.status(vendorRes.code).json(vendorRes)
  } catch (err) {
    res.status(err.code).json(err).end();
  }

});

/**
 * Cancella la risorsa vendor se presente

router.delete('/:id', async (req,res) => {

  try{
    const vendorRes = await dao.deleteVendor(req.params.id);
    const userRes = await userDao.deleteUser(req.params.id);
    res.status(userRes.code).json(userRes).end()
  } catch(err){
    res.status(err.code).json(err);
  }
  
});
 */

/**
 * Modifica il valore di wallet legato ad req.user.id sommandovi change
 */
router.patch('/wallet', authSupp.isVendor, normalizer.normalizeUpdateWallet, async (req, res) => {

  try {
    const resGet = await dao.getVendorById(req.user.id);
    const newWallet = resGet.vendor.wallet + req.body.change;
    if (newWallet < 0) {
      const err = new Error();
      err.msg = "No credit";
      err.code = "400";
      throw err;
    }

    const result = await dao.updateWallet(resGet.vendor.name, newWallet);
    res.status(result.code).json(result).end();
  }
  catch (err) {
    res.status(err.code).json(err).end();
  }



});



module.exports = router;