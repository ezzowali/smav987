

const path = require('path');

const express = require('express');

const judge = require('../controllers/judge');

const loggedin=require("../middleware/loggedin")


const router = express.Router();



router.get("/judge",loggedin,judge.getJudge)





router.post('/logout',judge.postLogout);





module.exports = router; 