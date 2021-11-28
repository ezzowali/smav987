
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



var ideaSchema =new Schema({

  ideaName:String,
  teamName:String,
  conrName:String,
  
  ideaFeild:String,
  review:String,
  reason:String,
  time:String
 


});






module.exports = mongoose.model('idea', ideaSchema);