
const path = require('path');

const express = require('express');

const evaluateController = require('../controllers/evaluate');

const loggedin=require("../middleware/loggedin")


const router = express.Router();






router.get("/evaluate",loggedin,evaluateController.getEvaluate)

router.post("/evaluate",loggedin,evaluateController.postEvaluate)






module.exports = router; 