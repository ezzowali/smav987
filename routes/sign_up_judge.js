const path = require('path');

const express = require('express');

const sign_up_judgeController = require('../controllers/sign_up_judge');


const router = express.Router();






router.get("/sign_up_judge",sign_up_judgeController.getRegister)

router.post("/sign_up_judge",sign_up_judgeController.postRegister)

router.get("/login_judge",sign_up_judgeController.getLogin)

router.post("/login_judge",sign_up_judgeController.postLogin)



module.exports = router; 