
const mongoose = require('mongoose');

const Schema = mongoose.Schema;



var evaluateSchema =new Schema({

    goals:String,
    evaluate:String,
    activity:String,
  
    continous:String,
    applicate:String,
    creativity:String,
    impaction:String,
    poster:String,
    doctors:String,
    time:String,
    note:String,
    total_marks:String,

    email:String






});






module.exports = mongoose.model('evaluate', evaluateSchema);