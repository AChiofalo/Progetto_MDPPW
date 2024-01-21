'use strict';
import Normalizer from '../normalize/normalizer.js';

const dao = require('../models/customer-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore

app.post('/api/customers', normalizer.normalizeUser, normalizer.normalizeCustomer,(req, res) => {
    // create a customer object from the signup form
      const user = {
        "username": req.body.username,
        "password": req.body.password,
        "role": ' CUSTOMER'
      };
      const customer = {
      "user": user,
      "first_name": req.body.first_name,
      "last_name": req.body.last_name,
      "location": req.body.location,
      "wallet": 0
      }
      
      dao.createCustomer(customer)
      .then((result) => res.status(201).header('Location', `/customers/${result}`).end())
      .catch((err) => res.status(503).json({ error: 'Database error during the signup'}));
    });