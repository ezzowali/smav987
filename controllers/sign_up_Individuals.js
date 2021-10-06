


const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const Users = require('../models/Users');

var randomBytes = require('randombytes');

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


  
  const newUser=new Users({

    firstName_En:req.body.firstName_En,
    middleName_En:req.body.middleName_En,
    lastName_En:req.body.lastName_En,
    age:req.body.age,
    gender:req.body.gender,

    city:req.body.city,
    phone:req.body.phone,
    university:req.body.university,
    Specialty:req.body.Specialty,
    EducationLevel:req.body.EducationLevel,
    email:req.body.email,
    SCFHS:req.body.SCFHS,
    times:req.body.times,
    identity_id:req.body.identity_id,
    accept:"wait"





  })




      newUser.save(function(err){

        const email=req.body.email;

        Users.findOne({ email: email })
          .then(userDoc => {
            if (userDoc.email==req.body.email ) {
              req.flash('error', 'E-Mail exists already, please pick a different one.');

              res.redirect("/sign_up_Individuals")
          
            }
          }).catch(err=>{

  console.log(err);

          })



        if (!err) {

          req.flash('success', 'Success!!');
          res.redirect("/sign_up_Individuals")


          const email=req.body.email
          
          return transporter.sendMail({
            to:email,
            from:"Smav@dmet.edu.sa",
            subject:"succeed",
            html:`
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
            <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/all.css">
            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.12.1/css/v4-shims.css">
            
            <link rel="stylesheet"href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css">
        
            <link rel="stylesheet" href="https://unpkg.com/aos@next/dist/aos.css" />
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <link rel="stylesheet" href="css/main.css">
        
        
        
        
            
        <style>
          
          .rss.opacity { filter: opacity(40%);  }
        
          .centered {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        
          
        }
        
        .LoginButton {
            background-color: Transparent;
            background-repeat:no-repeat;
            border: none;
            cursor:pointer;
            overflow: hidden;
            outline:none;
        }
        </style>
        
          
          </head>
        
        
         <body>
        
          <script src="https://unpkg.com/aos@next/dist/aos.js"></script>
          <script>
            AOS.init();
          </script>
        
        
        
        
        
        <nav class="navbar navbar-expand-lg navbar-light fixed-top navbar-fixed-top bg-light animated fadeinUp">
        
            <div class="container">
              <a class="navbar-brand" style="color: black;" href="/"> <img src="images/logo.png" height="50x" width="80px"></a>
              
        
        
        
        
        
            
              <button class="navbar-toggler" type="button" data-toggle="collapse" 
              data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
              aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
          
            
          
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
          
          
          
        
        
        
        
        
            <div class="nav-item dropdown">
              <a href="#" class="nav-link dropdown-toggle" style="color: rgb(15, 101, 230);" data toggle="dropdown">Home</a>
              <div class="dropdown-menu">
                <a href="#WhSMAV" class="dropdown-item">What is SMAV?</a>
                  <a href="#Goals" class="dropdown-item">اهدافنا</a>
                  <a href="#footer" class="dropdown-item">Contact </a>
                  
              </div>
            </div>
          
            <li class="nav-item">
                    <a class="nav-link test" style="color: black;" href="/whoSMAV">Who we are ?</a>
                   </li>
        
                   
        
                   
          <li class="nav-item">
                    <a class="nav-link" style="color: black;" href="/WhatWeDo">what we do ? </a>
                  </li>
          
        
         
                  <div class="nav-item dropdown">
                  <a href="#" class="nav-link dropdown-toggle" style="color: black;" data toggle="dropdown">Sign up</a>
                  <div class="dropdown-menu">
                    <a href="/sign_up_Individuals" class="dropdown-item">Indivuals</a>
                    <a href="/sign_up_group" class="dropdown-item">gruops</a>
                    <!-- <a href="/sign_up_admin" class="dropdown-item">admin</a> -->
        
                      
                  </div>
                </div>
        
             
              
        
               
          </ul>
          </div>
          
          </div>
          </nav>
        





    



            `
           
            
          
          })

          
          

        }else{
          console.log(err);


        
        }
      })
  




}

exports.getRegister=(req,res,next)=>{

  let message = req.flash('error');
  let message2 = req.flash('success');


  console.log(message);

  if (message.length > 0) {
    message = message[0];

    console.log(message);

  } 
  else {
    message = null;
   
    
  }

   if(message2.length > 0){

    message2 = message2[0];

    console.log(message2);

  } else{
    message2=null
  }

res.render('sign_up/sign_up_Individuals', {
  message: message,
  message2: message2,



});
}



//////




