const path = require('path');

const express = require('express');

const sign_upController_Gr = require('../controllers/sign_up_program');


const router = express.Router();






router.get("/sign_up_program",sign_upController_Gr.getRegister)

router.post("/sign_up_program",sign_upController_Gr.postRegister)


module.exports = router; 