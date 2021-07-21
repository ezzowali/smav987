


const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const samvHajjUsers = require('../models/samvHajjUsers');

const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport")

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
  api_key:"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"
  
  
  }
  
  }))



exports.postRegister=(req,res,next)=>{

  const newUser=new samvHajjUsers({
    firstName_Ar:req.body.firstName_Ar,
    middleName_Ar:req.body.middleName_Ar,
    lastName_Ar:req.body.lastName_Ar,
    firstName_En:req.body.firstName_En,
    middleName_En:req.body.middleName_En,
    lastName_En:req.body.lastName_En,
    identity_id:req.body.identity_id,
    gender:req.body.gender,
    nationality:req.body.nationality,
    birth_day:req.body.birth_day,
    Residence:req.body.Residence,
    phone:req.body.phone,
    university:req.body.university,
    college:req.body.college,
    EducationLevel:req.body.EducationLevel,
    email:req.body.email,
    SCFHS:req.body.SCFHS,
    url_video:req.body.url_video,
    Address:req.body.Address,
    Zip:req.body.Zip




  })




      newUser.save(function(err){

        const email=req.body.email;

        const identity_id=req.body.identity_id;
      



          samvHajjUsers.findOne({ email: email })
          .then(userDoc => {
            if (email==req.body.email ) {
              req.flash('error', 'E-Mail exists already, please pick a different one.');

              res.redirect("/sign_up_Individuals")
          
            }else if(userDoc.identity_id==req.body.identity_id){
              req.flash('error', 'E-Mail exists already, please pick a different one.');
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
            from:"dmet@dmet.edu.sa",
            subject:"succeed",
            html:`
            <h1 style="text-align: center;">الوجاء ارسال الملف على هذا الايميل </h1>
            
            <p>SMAV</p>
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

///////////
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};




