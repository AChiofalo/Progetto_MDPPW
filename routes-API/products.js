'use strict';
import Normalizer from '../normalize/normalizer.js';

const dao = require('../models/customer-dao.js');
const dao = require('../models/product-dao.js');
const express = require('express');
const router = express.Router();

const normalizer = new Normalizer();  //Normalizzatore