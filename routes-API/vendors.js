'use strict';
import Normalizer from '../normalize/normalizer.js';

const dao = require('../models/customer-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore



router.get('/api/vendors/:id', normalizer.normalizeVendor, (req,res) => {
  dao.getVendor(req.params.id)
  .then((result) => res.status(201).json(result).end())
  .catch((err) => res.status(503).json({ error: 'Database error during retrieve'}));
});

router.get('/api/vendors', normalizer.normalizeVendor ,(req,res) => {
    
  dao.getVendors(req.params.id)
  .then((result) => res.status(201).json(result).end())
  .catch((err) => res.status(503).json({ error: 'Database error during retrieve'}));
});

router.post('/api/vendors', normalizer.normalizeUser, normalizer.normalizeVendor ,(req, res) => {
  const user = {
      "username": req.body.username,
      "password": req.body.password,
      "role": 'VENDOR'
  };
  const vendor = {
    "user": user,
    "name": req.body.name,
    "location": req.body.location,
    "description": "",
    "img": "none",
    "wallet": 0
  }

  userDao.createVendor(vendor)
  .then((result) => res.status(201).header('Location', `/vendors/${result}`).end())
  .catch((err) => res.status(503).json({ error: 'Database error during the signup'}));
});






module.exports = router;
