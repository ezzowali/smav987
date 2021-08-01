

const path = require('path');

const express = require('express');

const members = require('../controllers/members');

const loggedin=require("../middleware/loggedin")


const router = express.Router();


router.get("/group",loggedin,members.getGroup)

router.get("/Users",loggedin,members.getUsers)




module.exports = router; 