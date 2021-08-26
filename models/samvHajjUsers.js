
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



var smav2Schema =new Schema({

  firstName_Ar:String,
  middleName_Ar:String,
  lastName_Ar:String,
  firstName_En:String,
  middleName_En:String,
  lastName_En:String,

  identity_id:{ type: Number, required: true, unique: true },
  gender:String,
  nationality:String,
  Residence:String,
  birth_day:Date,
  phone:Number,
  university:String,
  college:String,
  EducationLevel:String,
  email:{ type: String, required: true, unique: true },
  url_video:String,
  Zip:String,
  Address:String,
  SCFHS:String,
  password:String,
  accept:String,
  resetToken:String
  

});





module.exports = mongoose.model('samvHajjUsers', smav2Schema);