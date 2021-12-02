
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



var judgeSchema =new Schema({
  name:String,
  email:String,
  password:String,
 



});






module.exports = mongoose.model('judge', judgeSchema);