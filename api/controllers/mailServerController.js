'use strict';

var Mail = require('../models/mailServerModel');

exports.list_all_mail = function(req, res) {
  console.log("controller");
  Mail.inboxList(function(response){
    res.send(response);
  });
};


exports.create_a_mail = function(req, res) {
  //TODO
};


exports.delete_a_mail = function(req, res) {
  //TODO
};