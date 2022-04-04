

const fs = require('fs');
const path = require('path');

const judge = require('../models/judge');

const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport")


const bcrypt = require('bcryptjs');
const saltRounds = 10;

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  
  
  }
  
  }))


exports.postRegister=(req,res,next)=>{


  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  const newUser=new judge({
    name:req.body.name,
    email:req.body.email,
    password:hash,


  
  })


      newUser.save(function(err){

        const email=req.body.email

        judge.findOne({ email: email })
        .then(userDoc => {
          if (email==req.body.email ) {
            req.flash('error', 'E-Mail exists already, please pick a different one.');

            res.redirect("/sign_up_judge")
        
          }
        }).catch(err=>{

console.log(err);

        })



        if (!err) {


          req.flash('success', 'Success!!');
          res.redirect("/sign_up_judge")

        }else{
          console.log(err);
        }
      })





    })





}

exports.getRegister=(req,res,next)=>{

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
res.render('sign_up/sign_up_judge', {
  message: message,
  message2:message2

});
}


exports.postLogin=(req,res,next)=>{


  

  
  const email=req.body.email
  const password=req.body.password

 
  judge.findOne({email:email}).then(judge =>{


 if(judge){

bcrypt.compare(password, judge.password, function(err, result) {
  console.log("error_users");
  if (result===true) {
   

    console.log(req.session);
    req.session.loggedIn=true;
    req.session.judge=judge

    req.session.save(err => {
    console.log(err);
          res.redirect("/judge")

          
    });

  }
  
  else{


    console.log("error_users");

    req.flash('error', 'Invalid email or password.');
    return res.redirect('/');

   

  }
}); 

 

  
}

    })

  }









exports.getLogin=(req,res,next)=>{
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


  
  res.render('judge/login_judge',{
    message: message,
    message2: message2,

  })
    
}





///////////
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};




