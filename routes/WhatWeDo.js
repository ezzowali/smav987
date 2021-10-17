const path = require('path');

const express = require('express');

const whatWeDoController = require('../controllers/whatWeDo');


const router = express.Router();






router.get("/whatWeDo",whatWeDoController.getWhatWeDo)

router.get("/SMAV_MATCH",whatWeDoController.getMATCH)

router.get("/opening_soon",whatWeDoController.getOpen)









module.exports = router; 