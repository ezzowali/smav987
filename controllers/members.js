


const fs = require('fs');
const path = require('path');

const samvHajjGroup = require('../models/samvHajjGroup');
const samvHajjUsers = require('../models/samvHajjUsers');

const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport")

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  
  
  }
  
  }))





exports.getUsers=(req,res,next)=>{

 samvHajjUsers.findById(req.session.samvHajjUsers._id).select("firstName_Ar middleName_Ar lastName_Ar email identity_id SCFHS nationality EducationLevel  phone url_video accept").then(dataUser=>{

  res.render('members/Users',{
    dataUser,dataUser
  })

  console.log(dataUser);

     
          })



    
    
    
    
    
    
    
    }

    exports.getGroup=(req,res,next)=>{

      samvHajjGroup.findById(req.session.samvHajjGroup._id).select("fullName excel email identity_id email company jopTitle phone TeamSize groupNumber accept").then(dataGruop=>{
     
       res.render('members/groups',{
        dataGruop,dataGruop
       })
     
       console.log(dataGruop);
     
          
               })
     
     
     
         
         
         
         
         
         
         
         }



    
    
