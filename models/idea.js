
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



var ideaSchema =new Schema({

  ideaName:String,
  teamName:String,
  conrName:String,
  
  ideaFeild:Array,
  review:String,
  reason:String,
  time:String,
  subGr:String
 


});






module.exports = mongoose.model('idea', ideaSchema);