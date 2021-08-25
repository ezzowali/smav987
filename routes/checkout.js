

const path = require('path');

const express = require('express');

const checkout = require('../controllers/checkout');

const loggedin=require("../middleware/loggedin")


const router = express.Router();


router.get("/checkout",checkout.getCheckout)






module.exports = router; 