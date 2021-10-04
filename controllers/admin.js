
const fs = require('fs');
const path = require('path');

const xlsx = require("xlsx")//npm install xlsx


const samvHajjGroup = require('../models/samvHajjGroup');
const Users = require('../models/Users');


const nodemailer=require("nodemailer")
const sendgridTransport=require("nodemailer-sendgrid-transport");


const transporter=nodemailer.createTransport(sendgridTransport({
  auth:{
    api_key:"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"
  
  
  }
  
  }))





exports.getadminGroup=(req,res,next)=>{

  samvHajjGroup.find().select("reason fullName excel email identity_id email company jopTitle phone TeamSize groupNumber accept").then(group=>{

    res.render("admin/display_group",{
      group:group,
  

    })

})






}





exports.getadminGroupAccept=(req,res,next)=>{
  samvHajjGroup.find().select("accept").then(data=>{
    

    res.render("admin/accept_group")
  
})
  
 }


 exports.postAcceptGroup= async(req,res,next)=>{
  const accepting="accept"
  var email=req.body.email



  const useraccepting =await samvHajjGroup.findOne({email:email}).select("accept email").then(data=>{

    console.log(data);
    if (email==req.body.email ) {
      samvHajjGroup.updateOne({email:data.email},{accept:accepting}).then(update=>{

  console.log(update);
  
  
        }).then(result => {
           
     
  
    
        }) .catch(err => {
          console.log(err);

        });
       

        

      }

   
      return transporter.sendMail({
        to:email,
        from:"smav@dmet.edu.sa",
        subject:"succeed",
        html:"<h1> مبروك انقبلت </h1>"
      })

     
          })


          res.redirect("display_group")
}




exports.getWaitGroup=(req,res,next)=>{
  samvHajjGroup.find().select("accept").then(data=>{

  
  res.render("admin/wait_group")

})

}


exports.postWaitGroup= async(req,res,next)=>{
const accepting="wait"
var email=req.body.email



const useraccepting =await samvHajjGroup.findOne({email:email}).select("accept email").then(data=>{

  console.log(data);
  if (email==req.body.email ) {
    samvHajjGroup.updateOne({email:data.email},{accept:accepting}).then(update=>{

console.log(update);


      }).then(result => {
         
   

  
      }) .catch(err => {
        console.log(err);

      });
     

      

    }


   
        })


        res.redirect("display_group")
}

////////

exports.getRefuseGroup=(req,res,next)=>{
  samvHajjGroup.find().select("accept").then(data=>{

  
  res.render("admin/refuse_group")

})

}


exports.postRefuseGroup= async(req,res,next)=>{
const accepting="refuse"
var email=req.body.email
var reason=req.body.reason;



const useraccepting =await samvHajjGroup.findOne({email:email}).select("accept email").then(data=>{

  console.log(data);
  if (email==req.body.email ) {
    samvHajjGroup.updateOne({email:data.email},{accept:accepting,reason:reason}).then(update=>{

console.log(update);


      }).then(result => {
         
   

  
      }) .catch(err => {
        console.log(err);

      });
     

      

    }


   
        })


        res.redirect("display_group")
}

////////


exports.getadminUsers=(req,res,next)=>{




  Users.find().select("firstName_En middleName_En lastName_En firstName_Ar middleName_Ar lastName_Ar email identity_id SCFHS nationality EducationLevel  phone url_video accept  ").then(users=>{

    res.render("admin/display_users",{
      users:users,
  

    })

})

}

exports.getadminUsersAccept=(req,res,next)=>{




  Users.find({accept:"accept"}).select("firstName_Ar middleName_Ar lastName_Ar email identity_id SCFHS nationality EducationLevel  phone url_video accept  ").then(users=>{

    res.render("admin/display_usersAccept",{
      users:users,
  

    })

})








}

exports.getadminUsersRefuse=(req,res,next)=>{




  Users.find({accept:"refuse"}).select("firstName_En middleName_En lastName_En firstName_Ar middleName_Ar lastName_Ar email identity_id SCFHS nationality EducationLevel  phone url_video accept  ").then(users=>{

    res.render("admin/display_usersRefuse",{
      users:users,
  

    })

})








}



exports.getadminUsersWait=(req,res,next)=>{




  Users.find({accept:"wait"}).select("firstName_Ar middleName_Ar lastName_Ar email identity_id SCFHS nationality EducationLevel  phone url_video accept  ").then(users=>{

    res.render("admin/display_usersWait",{
      users:users,
  

    })

})

}


exports.postadminUsersWait=async(req,res,next)=>{

  const accepting="wait"
    var email=req.body.email



    const useraccepting =await Users.findOne({email:email}).select("accept email").then(data=>{

      console.log(data);
      if (email==req.body.email ) {
        Users.updateOne({email:data.email},{accept:accepting}).then(update=>{
  
    console.log(update);
    
    
          }).then(result => {
             
       
    
      
          }) .catch(err => {
            console.log(err);

          });
         
  
          

        }

     
        return transporter.sendMail({
          to:email,
          from:"smav@dmet.edu.sa",
          subject:"succeed",
          html:"<h1> مبروك انقبلت </h1>"
        })

       
            })
  
  
            res.redirect("display_usersWait")

}










     exports.getRefuse=(req,res,next)=>{
      Users.find().select("accept").then(data=>{

    
        res.render("admin/refuse_users")
      
    })
      
     }


     exports.postRefuse= async(req,res,next)=>{
      const accepting="refuse"
      const email= req.body.email


  
      var userEditing = await Users.findOne({email:email}).select("accept email").then(data=>{
    

        console.log(userEditing);

        if (data.email==req.body.email ) {
      
          console.log(data);
          Users.updateOne({email:data.email},{accept:accepting}).then(update=>{
    
            console.log(update);
        

            

      
                  }).then(result => {
             
       
    
      
                  }) .catch(err => {
                    console.log(err);
        
                  });


                  return transporter.sendMail({
                    to:email,
                    from:"smav@dmet.edu.sa",
                    subject:"succeed",
                    html:"<h1> م انقبلت  </h1>"
                  })
                 
          
              

    
        }

    
      
    

    
  
              })
    
    
              res.redirect("display_users")
  }





  exports.getAccept=(req,res,next)=>{
    Users.find().select("accept").then(data=>{

  
      res.render("admin/accept_users")
    
  })
    
   }


   exports.postAccept= async(req,res,next)=>{
    const accepting="accept"
    var email=req.body.email



    const useraccepting =await Users.findOne({email:email}).select("accept email").then(data=>{

      console.log(data);
      if (email==req.body.email ) {
        Users.updateOne({email:data.email},{accept:accepting}).then(update=>{
  
    console.log(update);
    
    
          }).then(result => {
             
       
    
      
          }) .catch(err => {
            console.log(err);

          });
         
  
          

        }

     
        return transporter.sendMail({
          to:email,
          from:"smav@dmet.edu.sa",
          subject:"succeed",
          html:"<h1> مبروك انقبلت </h1>"
        })

       
            })
  
  
            res.redirect("display_users")
}




exports.getWait=(req,res,next)=>{
  Users.find().select("accept").then(data=>{


    res.render("admin/wait_users")
  
})
  
 }


 exports.postWait= async(req,res,next)=>{
  const accepting="wait"
  var email=req.body.email



  const useraccepting =await Users.findOne({email:email}).select("accept email").then(data=>{

    console.log(data);
    if (email==req.body.email ) {
      Users.updateOne({email:data.email},{accept:accepting}).then(update=>{

  console.log(update);
  
  
        }).then(result => {
           
     
  
    
        }) .catch(err => {
          console.log(err);

        });
       

        

      }


     
          })


          res.redirect("display_users")
}


exports.getAcceptExcel=(req,res,next)=>{






  Users.find({accept:"accept"}).select("times Specialty university city accept firstName_En  middleName_En lastName_En email age gender  SCFHS  EducationLevel  phone  ").then(data=>{


    res.send(JSON.stringify(data))


    
  
})
  
 }


//  https://data.page/json/csv


exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};