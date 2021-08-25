


const fs = require('fs');
const path = require('path');

const samvHajjGroup = require('../models/samvHajjGroup');
const samvHajjUsers = require('../models/samvHajjUsers');

const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport")

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  
  
  }
  
  }))





exports.getCheckout=(req,res,next)=>{


  res.render('checkout',{

  })

    }




    
    
