'use strict';
import Normalizer from '../normalize/normalizer.js';

const daoCustomer = require('../models/customer-dao.js');
const daoVendor = require('../models/vendor-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore
