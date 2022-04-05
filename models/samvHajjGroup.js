
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



var smav2Schema =new Schema({

  firstName_En:String,
  middleName_En:String,
  lastName_En:String,
  
  thirdName_AR:String,

  email:{ type: String, required: true, unique: true },
  phone:Number,
  gender:String,
  age:Number,
  city:Array,
  university:String,
  EducationLevel:Array,
  Specialty:Array,
  scfhs:String,
  times:String,
  accept:String,
  url_video:String,
  identity_id:{ type: Number, required: true, unique: true },
  nationality:String,
  company:String,
  skills:String,
  time:String,
  image_tarkhees:String,





});






module.exports = mongoose.model('samvHajjGroup', smav2Schema);