


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

      samvHajjGroup.findById(req.session.samvHajjGroup._id).select("reason fullName excel email identity_id email company jopTitle phone TeamSize groupNumber accept").then(dataGruop=>{
     
       res.render('members/groups',{
        dataGruop,dataGruop
       })
     
       console.log(dataGruop);
     
          
               })
     
     
     
         
         
         
         
         
         
         
         }





         exports.postGroup=async(req,res,next)=>{
           
          const excel =req.file;
          console.log(req.file);
          console.log(req.body)
          
          var accept="wait"

        
        
        
          const useraccepting =await samvHajjGroup.findById(req.session.samvHajjGroup._id).select("accept excel").then(data=>{
        
            samvHajjGroup.updateOne({excel:data.excel},{excel:excel.path}).then(update=>{
    
    
    
            })

            samvHajjGroup.updateOne({accept:data.accept},{accept:accept}).then(update=>{
    
    
    
            })

       
            console.log(data);
               
        
                
        
              
             
                  })
        
        
                  res.redirect("groups")
        }


    
    
