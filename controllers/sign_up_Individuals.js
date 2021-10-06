


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
           
        <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
        <table width="100%" cellspacing="0" cellpadding="0">
            <tbody>
                <tr>
                    <td class="esd-container-frame" width="960" valign="top" align="center">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="esd-block-image" align="center" style="font-size:0"><a href="https://www.smavacadmey.com" target="_blank"><img src="https://i.imgur.com/WuxuLUZ.png" alt style="display: block;" width="562"></a></td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
<!-- //// -->
    <td class="esd-stripe" esd-custom-block-id="19035" align="center">
        <table class="es-content-body" style="background-color: #333333;" width="600" cellspacing="0" cellpadding="0" bgcolor="#333333" align="center">
            <tbody>
              
                <tr>
                    <td class="esd-structure es-p25t es-p40b es-p40r es-p40l" esd-custom-block-id="9786" align="left">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="esd-container-frame" width="520" valign="top" align="center">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-block-text es-m-txt-c es-p15b" align="center">
                                                        <h2 style="color: #efefef;">Welcome To SMAV Match</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-block-text es-m-txt-c es-p20b" align="center">
                                                        <p style="color: #efefef;">
                                                            <p style="color: #efefef;">
                                                                السلام عليكم ورحمة الله وبركاته

                                                            </p>
                                                            


                                                            <p style="color: #efefef;">


                                                                عزيزي المتطوع

                                                            </p>

                                                            <p style="color: white;">
                                                          
                                                            تشكر لكم الأكاديمية السعودية للتطوع الصحي روح العطاء وحب الخير والمبادرة لخدمة المجتمع، كما يسعدنا إبلاغكم باستلام طلاب انضمامكم لبرنامج سماف مجتمعي ، وسنوافيكم بالرد خلال الأيام القادمة إن شاء الله..
                                                             </p>
                                                    </td>
                                                </tr>
                                              
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td class="esd-structure" align="left">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td class="esd-container-frame" width="600" valign="top" align="center">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-block-banner" style="position: relative;" align="center" esdev-config="h2"><a target="_blank">
                                                            <img class="adapt-img esdev-stretch-width esdev-banner-rendered" src="https://i.giphy.com/media/ImYxfHy3yiE6c5wDPT/giphy.webp" alt title width="100%">
                                                        </a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </td>
    <!-- /////// -->


    <td class="esd-stripe" esd-custom-block-id="9796" align="center" >
        <table class="es-footer-body" style="border-top:1px solid #333333;" width="600" cellspacing="0" cellpadding="0" align="center" style="background-color: #333333;">
            <tbody style="background-color: #333333;">
                <tr style="background-color: #333333;">
                    <td class="esd-structure es-p20t es-p20b es-p20r es-p20l" align="left">
                        <!--[if mso]><table width="560" cellpadding="0"
                                cellspacing="0"><tr><td width="180" valign="top"><![endif]-->
                        <table class="es-left" cellspacing="0" cellpadding="0" align="left">
                            <tbody>
                                <tr>
                                    <td class="es-m-p0r es-m-p20b esd-container-frame" width="180" valign="top" align="center">
                                        <table width="100%" cellspacing="0" cellpadding="0" style="background-color: #333333;">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-block-image es-p15b es-m-txt-c" align="left" style="font-size:0"><a target="_blank" href="https://viewstripo.email/"><img src="https://i.imgur.com/WuxuLUZ.png" alt="Flowers logo" style="display: block;" title="Flowers logo" width="135"></a></td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-block-text es-m-txt-c" esd-links-underline="none" align="left">
                                                        <p><a target="_blank" href="tel:+966 55 222 6883" style="text-decoration: none; color: white;  padding-left: 1rem;"> +966552226883</a></p>
                                                        <p><a target="_blank" href="smav@dmet.edu.sa" style="text-decoration: none; color: white;  padding-left: 1rem;"> smav@dmet.edu.sa</a></p>
                                                        <p style="color: white;  padding-left: 1rem;  padding-bottom: 1rem;" > © 2021 SMAV</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!--[if mso]></td><td width="20"></td><td width="360" valign="top"><![endif]-->
                        <table cellspacing="0" cellpadding="0" align="right" style="background-color: #333333;">
                            <tbody>
                                <tr>
                                    <td class="esd-container-frame" width="360" align="left">
                                        <table width="100%" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr>
                                                    <td class="esd-block-social es-p15b es-m-txt-c" align="left" style="font-size:0">
                                                        <table class="es-table-not-adapt es-social" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr>
                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href><img title="Facebook" src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-gray-bordered/facebook-circle-gray-bordered.png" alt="Fb" width="32"></a></td>
                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href><img title="Twitter" src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-gray-bordered/twitter-circle-gray-bordered.png" alt="Tw" width="32"></a></td>
                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href><img title="Instagram" src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-gray-bordered/instagram-circle-gray-bordered.png" alt="Inst" width="32"></a></td>
                                                                    <td class="es-p10r" valign="top" align="center"><a target="_blank" href><img title="Youtube" src="https://tlr.stripocdn.email/content/assets/img/social-icons/circle-gray-bordered/youtube-circle-gray-bordered.png" alt="Yt" width="32"></a></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="esd-block-text es-m-txt-c" align="left">
                                                        <p style="color: white;">You are receiving this 
                                                            email because you have visited our site or asked us about regular newsletter.</p>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!--[if mso]></td></tr></table><![endif]-->
                    </td>
                </tr>
            </tbody>
        </table>
    </td>





    



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




