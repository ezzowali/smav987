

const fs = require('fs');
const path = require('path');

const samvHajjGroup = require('../models/samvHajjGroup');

var randomBytes = require('randombytes');
const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport")


const bcrypt = require('bcryptjs');
const adminDb = require('../models/adminDb');


const saltRounds = 10;




const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
    
  }
  
  }))


exports.postRegister=(req,res,next)=>{
  const excel =req.file;
  console.log(req.file);
  console.log(req.body)
  // console.log(image);

  const newUser=new samvHajjGroup({
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
    accept:"wait",
    url_video:req.body.url_video,
    nationality:req.body.nationality,
    company:req.body.company

    

  
  })


      newUser.save(function(err){

        const email=req.body.email

        samvHajjGroup.findOne({ email: email })
        .then(userDoc => {
          if (userDoc.email==req.body.email ) {
            req.flash('error', 'E-Mail exists already, please pick a different one.');

            res.redirect("/sign_up_group")
        
          }
          else if(userDoc.identity_id==req.body.identity_id){
            req.flash('error', 'E-Mail exists already, please pick a different one.');
          }
        }).catch(err=>{


          console.log(err);

        })

        if (!err) {


          req.flash('success', 'Success!!');
          res.redirect("/sign_up_group")

          const email=req.body.email
          return transporter.sendMail({
            to:email,
            from:"smav@dmet.edu.sa",
            subject:"succeed",
            html:`
            
            <h1> الرجاء ارسال ملف يتضمن فيه الاسم الاول واسم اب والاسم الاخير والايميل </h1>"

            
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
res.render('sign_up/sign_up_group', {
  message: message,
  message2:message2

});
}


