
const fs = require('fs');
const path = require('path');

exports.getWhatWeDo=(req,res,next)=>{


  let message = req.flash('error');

  let message2 = req.flash('success');
  if (message.length > 0) {
    message = message[0];

  } else {
    message = null;
    
  }

  if (message2.length > 0) {
    message2 = message2[0];

  }
  else {
    message2 = null;
  }

  res.render('WhatWeDo',{
    message:message,
    message2:message2
  });
  }
  