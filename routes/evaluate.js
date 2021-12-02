
const path = require('path');

const express = require('express');

const evaluateController = require('../controllers/evaluate');


const router = express.Router();






router.get("/evaluate",evaluateController.getEvaluate)

router.post("/evaluate",evaluateController.postEvaluate)






module.exports = router; 