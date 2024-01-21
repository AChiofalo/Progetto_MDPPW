'use strict';
const Normalizer = require('../normalize/normalizer.js');

const dao = require('../models/product-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore

router.get('/:id', normalizer.normalizeProduct, (req,res) => {
    
    dao.getProduct(req.params.id)
    .then((result) => res.status(201).json(result).end())
    .catch((err) => res.status(503).json({ error: 'Database error during retrieve'}));
  });
  
module.exports = router;