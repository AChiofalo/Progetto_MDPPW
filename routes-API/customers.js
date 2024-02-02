'use strict';
const Normalizer = require('../normalize/normalizer.js');

const dao = require('../models/customer-dao.js');
const userDao = require('../models/user-dao.js');
const express = require('express');
const router = express.Router();

const authSupp = require('../auth-support.js');

const normalizer = new Normalizer();  //Normalizzatore


/**
 * SIGN UP per Customer
 * Inserisce un nuovo customer ed user usando req.body
 */
router.post('/', normalizer.normalizeCreateCustomer, async (req, res) => {

  const user = {
    "username": req.body.username,
    "password": req.body.password,
    "role": "CUSTOMER"
  }

  const customer = {
    "first_name": req.body.first_name,
    "last_name": req.body.last_name,
    "wallet": 0
  }

  try {
    const userRes = await userDao.createUser(user);
    customer["id"] = userRes.id;
    const customerRes = await dao.createCustomer(customer); //user potrebbe essere creato al contrario di customer!
    res.status(customerRes.code).json(customerRes)
  } catch (err) {
    res.status(err.code).json(err).end();
  }
});


router.patch('/wallet', authSupp.isCustomer, normalizer.normalizeUpdateWallet, async (req, res) => {

  try {
    const resGet = await dao.getCustomerById(req.user.id);
    const newWallet = resGet.customer.wallet + req.body.change;
    if (newWallet < 0) {
      const err = new Error();
      err.msg = "No credit";
      err.code = 400;
      throw err;
    }

    const result = await dao.updateWalletById(resGet.customer.id, newWallet);
    res.status(result.code).json(result).end();
  }
  catch (err) {
    res.status(err.code).json(err).end();
  }
});

/**
 * Restituisce la risorsa vendor tramite req.params.name
 */
router.get('/:id', (req, res) => {
  dao.getCustomerById(req.params.id)
    .then((result) => res.status(result.code).json(result).end())
    .catch((err) => res.status(err.code).json(err));
});

module.exports = router;