
const fs = require('fs');
const path = require('path');

const samvHajjGroup = require('../models/samvHajjGroup');
const samvHajjUsers = require('../models/samvHajjUsers');
const adminDb = require('../models/adminDb');




const bcrypt = require('bcryptjs');


const saltRounds = 10;

const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport")

const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  
  
  }
  
  }))


exports.postLogin=(req,res,next)=>{


  

  
    const email=req.body.email
    const password=req.body.password
 
   
    adminDb.findOne({email:email}).then(admin =>{
      
    samvHajjUsers.findOne({email:email}).then(samvHajjUsers =>{

    samvHajjGroup.findOne({email:email}).then(samvHajjGroup =>{

    
    
  
    
        if(samvHajjGroup){

          console.log("error_users");
    
          bcrypt.compare(password, samvHajjGroup.password, function(err, result) {
    
            if (result===true) {
  
    
              console.log(req.session);
              req.session.loggedIn=true;
              req.session.samvHajjGroup=samvHajjGroup
    
              req.session.save(err => {
              console.log(err);
                    res.redirect("/group")
              });
    
            }

            else if(samvHajjUsers){


              bcrypt.compare(password, samvHajjUsers.password, function(err, result) {
             
                if (result===true) {

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
        }
            
            
            else{
  
          
              
    
              req.flash('error', 'Invalid email or password.');
              return res.redirect('/');
              
              console.log("error_G");

    
            }
    });  
    }


   
    else if(samvHajjUsers){


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
}


else if(admin){

  bcrypt.compare(password, admin.password, function(err, result) {
    console.log("error_users");
    if (result===true) {
     

      console.log(req.session);
      req.session.loggedIn=true;
      req.session.admin=admin

      req.session.save(err => {
      console.log(err);
            res.redirect("/admin")

            
      });

    }
    
    else{

  
      console.log("error_users");

      req.flash('error', 'Invalid email or password.');
      return res.redirect('/');

     

    }
}); 

   

    
}
    else{
      console.log("error");
  
      req.flash('error', 'Invalid email or password.');
      return res.redirect('/');
    }
      })
    })
  
  })
    }
  
  exports.getLogin=(req,res,next)=>{
  
  
  
    
    res.render('members/login')
      
  }