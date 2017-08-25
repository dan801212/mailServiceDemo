'use strict';

var Mail = require('../models/mailServerModel');

exports.list_all_mail = function(req, res) {
  Mail.inboxList("", "", function(response){
    res.send(response);
    // console.log(response[0].headers);
  });
};

exports.compose_mail = function(req, res) {
  Mail.composeMail(req.body, function(response){
    res.send(response);
  });
};

exports.inbox_mail_with_id = function(req, res) {
  Mail.inboxList(req.params.userId, "inbox", function(response){
    res.send(response);
  });
};


exports.sent_mail_with_id = function(req, res) {
  Mail.inboxList(req.params.userId, "sent", function(response){
    res.send(response);
  });
};

exports.delete_mail_with_id = function(req, res) {
  Mail.deleteList(req.params.userId, "inbox", function(response){
    res.send(response);
  });
};


