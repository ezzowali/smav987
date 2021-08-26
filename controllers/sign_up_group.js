

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
    excel:excel.path,
    reason:"none"
    

  
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


///////


exports.getResetGroup = (req, res, next) => {

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



  res.render('sign_up/groupReset',{
    message:message,
    message2:message2


  })
};

exports.postResetGroup=(req,res,next)=>{


randomBytes(16, function(err, buffer)  {
    if (err) {
      console.log(err);
      return res.redirect('/groupReset');
    }
    const token = buffer.toString('hex');
    samvHajjGroup.findOne({ email: req.body.email })
      .then(smav => {
        if (!smav) {
          
          
          req.flash('error', 'No account with that email found.');
          return res.redirect('/groupReset');
        }
      
        
        smav.resetToken = token;
        
        return smav.save();
      })
      .then(result => {
        req.flash('success', 'it success ! conguraltion!!');
        res.redirect("/groupReset")
       


        transporter.sendMail({

          to: req.body.email,
          from: 'dmet@dmet.edu.sa',
          subject: 'اعادة كلمة المرور',
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://${process.env.PORT ||"localhost:3000"}/group_new_password/${token}">link</a> to set a new password.</p>
          `
        });

      })
      .catch(err => {
        console.log(err);
      });

  });









}

exports.getNewPasswordGroup = (req, res, next) => {
  const token = req.params.token;
  let message2 = req.flash('success');
  if (message2.length > 0) {
    message2 = message2[0];
  } else {
    message2 = null;
  }
  samvHajjGroup.findOne({ resetToken: token })
    .then(smav => {
  

      console.log(smav);
      
      res.render('sign_up/group_new_password', {
      
    
        smavId: smav._id.toString(),
        passwordToken: token,
        message2:message2
      
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.postNewPasswordGroup = (req, res, next) => {
  const newPassword = req.body.password;
  const smavId = req.body.smavId;
  const passwordToken = req.body.passwordToken;
  let resetUser;

  samvHajjGroup.findOne({
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




