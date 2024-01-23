'use strict';
const Normalizer = require('../normalize/normalizer.js');

const dao = require('../models/vendor-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore



router.get('/:username', (req,res) => {
  dao.searchVendorsByUsername(req.params.username)
  .then((result) => res.status(200).json(result).end())
  .catch((err) => res.status(503).json({error: err}));
});

router.get('/', (req,res) => {
  dao.searchVendorsByUsername("")
  .then((result) => res.status(200).json(result).end())
  .catch((err) => res.status(503).json({error: err}));
});

router.post('/', normalizer.normalizeVendor ,(req, res) => {
   
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
  .then((result) => res.status(201).header('Location', `/vendors/${result}`).end())
  .catch((err) => res.status(503).json({error: err}));
});






module.exports = router;
