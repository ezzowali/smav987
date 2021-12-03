
const fs = require('fs');
const path = require('path');

const xlsx = require("xlsx")//npm install xlsx


const samvHajjGroup = require('../models/samvHajjGroup');
const judge = require('../models/judge');





const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport");


const transporter=nodemailer.createTransport(sendgridTransport({
    auth:{
      api_key:"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"
      
    }
    
    }))




exports.getJudge=(req,res,next)=>{



res.render("judge/judge",{
     
  

})





}



exports.postEvaluate = (req, res, next) => {


    var today = new Date();
  var time = today.getDay()+"/"+today.getMonth()+"-"+today.getHours() + ":" + today.getMinutes() ;
  
    const newUser = new evaluate({
  
      goals: req.body.goals,
      evaluate: req.body.evaluate,
      activity: req.body.activity,
      continous: req.body.continous,
      applicate: req.body.applicate,
      creativity: req.body.creativity,
      impaction:req.body.impaction,
      poster:req.body.poster,
      name:req.body.name,
      email:req.body.email,
      time:time
  
  
    })
  
  
    newUser.save(function (err) {
  
      if(!err){
        req.flash('success', 'Success!!');
        res.redirect("evaluate")
        
      }
      else{
        console.log(err);
      }
      
  
  
    })
  
  
  
  
  
    
  
  
  }
  
  exports.getEvaluate = (req, res, next) => {


    judge.find().select(" thirdName_AR reason fullName excel email identity_id email company gender jopTitle phone TeamSize groupNumber accept").then(group=>{


  
    let message = req.flash('error');
  
    let message2 = req.flash('success');
    if (message.length > 0) {
      message = message[0];
  
    } else {
      message = null;
  
    }
  
    if (message2.length > 0) {
      message2 = message2[0];
  
    }
    else {
      message2 = null;
    }
    res.render('evaluate', {
      message: message,
      message2: message2
  
    });
  })
  

}









 


//  https://data.page/json/csv


exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};