

const fs = require('fs');
const path = require('path');

const samvHajjGroup = require('../models/samvHajjGroup');

var randomBytes = require('randombytes');
const nodemailer = require("nodemailer")
const sendgridTransport = require("nodemailer-sendgrid-transport")


const bcrypt = require('bcryptjs');
const adminDb = require('../models/adminDb');


const saltRounds = 10;




const transporter = nodemailer.createTransport(sendgridTransport({
  auth: {
    api_key: "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"

  }

}))


exports.postRegister = (req, res, next) => {


  var today = new Date();
var time = today.getDay()+"/"+today.getMonth()+"-"+today.getHours() + ":" + today.getMinutes() ;

  const newUser = new samvHajjGroup({

    firstName_En: req.body.firstName_En,
    middleName_En: req.body.middleName_En,
    lastName_En: req.body.lastName_En,
    thirdName_AR: req.body.thirdName_AR,
    age: req.body.age,
    gender: req.body.gender,
    city: req.body.city,
    phone: req.body.phone,
    university: req.body.university,
    Specialty: req.body.Specialty,
    EducationLevel: req.body.EducationLevel,
    email: req.body.email,
    SCFHS: req.body.SCFHS,
    times: req.body.times,
    identity_id: req.body.identity_id,
    accept: "wait",
    url_video: req.body.url_video,
    nationality: req.body.nationality,
    company: req.body.company,
    skills: req.body.skills,
    time:time



  })


  newUser.save(function (err) {

    // if(userDoc==null){

    //   console.log("hjkk");
    //   req.flash('error', 'E-Mail exists already, please pick a different one.');
    //   res.redirect("/sign_up_Individuals") 
    // }else{

    //   req.flash('success', 'Success!!');
    //   res.redirect("/sign_up_Individuals") 
    // }

    samvHajjGroup.findOne({ email: req.body.email, identity_id: req.body.identity_id })
      .then(userDoc => {
        if (userDoc == null) {
          req.flash('error', 'E-Mail exists already, please pick a different one.');

          res.redirect("/sign_up_group")

        } else {
          req.flash('success', 'Success!!');
          res.redirect("/sign_up_group")

          return transporter.sendMail({
            to: req.body.email,
            from: "program_ru@dmet.edu.sa",
            subject: "SMAV",
            html: `
    
                <p class="esd-block-image" align="center" style="font-size:0"><a href="https://www.smavacadmey.com" target="_blank"><img
                src="https://i.imgur.com/vUIRe8Z.png" alt style="display: block;" width="562"></a></p>
    
    
    
    
    
            
                <div style="text-align: center;">
    
    
    
                
    
    <p style="color: #000000;">
        السلام عليكم ورحمة الله وبركاته
    
    </p>
    
    
    
    
    <p style="color: #000000;">
    
    
        عزيزي المتطوع
    
    </p>
    
    <p style="color: 000000;">
    
    
    تشكر لكم الأكاديمية السعودية للتطوع الصحي روح العطاء وحب الخير والمبادرة لخدمة المجتمع، كما يسعدنا 
    إبلاغكم باستلام طلب انضمامكم لبرنامج سماف مجتمعي، وسنوافيكم بالرد خلال الأيام القادمة إن شاء الله..</p>
    
    
    
    </div>
    
           
    <p class="esd-block-banner" style="position: relative; color: black;" align="center" esdev-config="h2"><a target="_blank">
        <img class="adapt-img esdev-stretch-width esdev-banner-rendered" src="https://i.imgur.com/qILMxkY.jpeg" alt title width="70%">
    </a>
    </p>

                `




          })

        }

      }).catch(err => {


        console.log(err);

      })










  })







}

exports.getRegister = (req, res, next) => {

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
    message2: message2

  });
}


