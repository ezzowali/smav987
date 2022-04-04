const path = require('path');

const express = require('express');

const sign_upController_Ind = require('../controllers/sign_up_volunteering');


const router = express.Router();






router.get("/sign_up_volunteering",sign_upController_Ind.getRegister)

router.post("/sign_up_volunteering",sign_upController_Ind.postRegister)






module.exports = router; 