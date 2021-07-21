const path = require('path');

const express = require('express');

const sign_upController = require('../controllers/sign_up_Individuals');


const router = express.Router();






router.get("/sign_up_Individuals",sign_upController.getRegister)

router.post("/sign_up_Individuals",sign_upController.postRegister)



module.exports = router; 