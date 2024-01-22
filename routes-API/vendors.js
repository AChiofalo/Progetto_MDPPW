'use strict';
const Normalizer = require('../normalize/normalizer.js');

const dao = require('../models/vendor-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore



router.get('/:id', normalizer.normalizeVendor, (req,res) => {
  dao.getVendor(req.params.id)
  .then((result) => res.status(201).json(result).end())
  .catch((err) => res.status(503).json({ error: 'Database error during retrieve'}));
});

router.get('/', normalizer.normalizeVendor ,(req,res) => {
    
  dao.getVendors(req.params.id)
  .then((result) => res.status(201).json(result).end())
  .catch((err) => res.status(503).json({ error: 'Database error during retrieve'}));
});

router.post('/', normalizer.normalizeVendor ,(req, res) => {
   
  const vendor = {
    "username": req.body.username,
    "password": req.body.password,
    "description": "",
    "img": "none",
    "wallet": 0
  }

  dao.createVendor(vendor)
  .then((result) => res.status(201).header('Location', `/vendors/${result}`).end())
  .catch((err) => res.status(503).json({error: err}));
});






module.exports = router;
