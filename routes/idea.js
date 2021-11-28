const path = require('path');

const express = require('express');

const ideaController = require('../controllers/idea');


const router = express.Router();






router.get("/idea",ideaController.getIdea)

router.post("/idea",ideaController.postIdea)






module.exports = router; 