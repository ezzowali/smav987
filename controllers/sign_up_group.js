

const fs = require('fs');
const path = require('path');

const samvHajjGroup = require('../models/samvHajjGroup');

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

  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
  const newUser=new samvHajjGroup({
    fullName:req.body.fullName,

    identity_id:req.body.identity_id,

    email:req.body.email,
    phone:req.body.phone,
    company:req.body.company,
    jopTitle:req.body.jopTitle,
    TeamSize:req.body.TeamSize,
    groupNumber:req.body.groupNumber,
    password:hash,
    accept:"wait",
    excel:excel.path
    

  
  })


      newUser.save(function(err){

        const email=req.body.email

        samvHajjGroup.findOne({ email: email })
        .then(userDoc => {
          if (email==req.body.email ) {
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
            from:"dmet@dmet.edu.sa",
            subject:"succeed",
            html:"<h1> الرجاء ارسال ملف يتضمن فيه الاسم الاول واسم اب والاسم الاخير والايميل </h1>"
          })

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
res.render('sign_up/sign_up_group', {
  message: message,
  message2:message2

});
}



exports.postLogin=(req,res,next)=>{


  

  
  const email=req.body.email
  const password=req.body.password


  adminDb.findOne({email:email}).then(admin =>{

  samvHajjGroup.findOne({email:email}).then(samvHajjGroup =>{

 
    if(samvHajjGroup){
  
     
  
      bcrypt.compare(password, samvHajjGroup.password, function(err, result) {
  
        if (result===true) {
  
  
          console.log(req.session);
          req.session.loggedIn=true;
          req.session.samvHajjGroup=samvHajjGroup
  
          req.session.save(err => {
          console.log(err);
                res.redirect("/groups")
          });
  
        }      
        
        else{
          console.log("wow");
          req.flash('error', 'Invalid email or password.');
          return res.redirect('/');
          
  
        }
  });  
  } else if(admin){


    bcrypt.compare(password, admin.password, function(err, result) {
  
      if (result===true) {


        console.log(req.session);
        req.session.loggedIn=true;
        req.session.admin=admin

        req.session.save(err => {
        console.log(err);
              res.redirect("/display_group")
        });

      }      
      
      else{
        console.log("wow_admin");
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/');
        

      }
}); 


  }else{

    console.log("wow_non");
    req.flash('error', 'Invalid email or password.');
    return res.redirect('/');
  }
  
  })
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
  res.render('home', {
    message: message,
      message2: message2
  });



    
}


///////////
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};




