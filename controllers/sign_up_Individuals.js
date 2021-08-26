


const fs = require('fs');
const path = require('path');
const flash = require('connect-flash');
const samvHajjUsers = require('../models/samvHajjUsers');

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


  bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
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
    Zip:req.body.Zip,
    password:hash,
    accept:"wait"




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


exports.postLogin=(req,res,next)=>{

  const email=req.body.email
  const password=req.body.password

 

    
  samvHajjUsers.findOne({email:email}).then(samvHajjUsers =>{

     if(samvHajjUsers){


      bcrypt.compare(password, samvHajjUsers.password, function(err, result) {
        console.log("error_users");
        if (result===true) {
          console.log("error_users");
      
          console.log(req.session);
          req.session.loggedIn=true;
          req.session.samvHajjUsers=samvHajjUsers
      
          req.session.save(err => {
          console.log(err);
                res.redirect("/users")
      
                
          });
      
        }
        
        else{
      
      
          console.log("error_users");
      
          req.flash('error', 'Invalid email or password.');
          return res.redirect('/');
      
         
      
        }
      });  
      }else {
        console.log("error_users");
      
        req.flash('error', 'Invalid email or password.');
        return res.redirect('/');

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
  res.render('home', {
    message: message,
      message2: message2
  });


    
}
//////




exports.getResetIndividuals = (req, res, next) => {

  let message = req.flash('error');
  if (message.length > 0) {
    message = message[0];
  } else {
    message = null;
  }



  let message2 = req.flash('success');
  if (message2.length > 0) {
    message2 = message2[0];
  } else {
    message2 = null;
  }



  res.render('sign_up/IndividualsReset',{
    message:message,
    message2:message2


  })
};

exports.postResetIndividuals=(req,res,next)=>{


randomBytes(16, function(err, buffer)  {
    if (err) {
      console.log(err);
      return res.redirect('/IndividualsReset');
    }
    const token = buffer.toString('hex');
    samvHajjUsers.findOne({ email: req.body.email })
      .then(smav => {
        if (!smav) {
          
          
          req.flash('error', 'No account with that email found.');
          return res.redirect('/IndividualsReset');
        }
      
        
        smav.resetToken = token;
        
        return smav.save();
      })
      .then(result => {
        req.flash('success', 'it success ! conguraltion!!');
        res.redirect("/IndividualsReset")
       


        transporter.sendMail({

          to: req.body.email,
          from: 'dmet@dmet.edu.sa',
          subject: 'اعادة كلمة المرور',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://smav-hajj.smavacadmey/Individuals_new_password/${token}">link</a> to set a new password.</p>
          `
        });

      })
      .catch(err => {
        console.log(err);
      });

  });









}

exports.getNewPasswordIndividuals = (req, res, next) => {
  const token = req.params.token;
  let message2 = req.flash('success');
  if (message2.length > 0) {
    message2 = message2[0];
  } else {
    message2 = null;
  }
  samvHajjUsers.findOne({ resetToken: token })
    .then(smav => {
  

      console.log(smav);
      
      res.render('sign_up/Individuals_new_password', {
      
    
        smavId: smav._id.toString(),
        passwordToken: token,
        message2:message2
      
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPasswordIndividuals = (req, res, next) => {
  const newPassword = req.body.password;
  const smavId = req.body.smavId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  samvHajjUsers.findOne({
    resetToken: passwordToken,
    _id: smavId
  })
    .then(smav => {
      resetUser = smav;
      return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
    })
    .then(result => {
console.log(result);
   
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    });
};

///////////
exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};




