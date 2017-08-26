'use strict';

var Mail = require('../models/mailServerModel');

exports.list_all_mail = function(req, res) {
  Mail.inboxList(req.query, function(response){
    res.send(response);
  });
};

// exports.inbox_mail_with_id = function(req, res) {
//   Mail.inboxListWithId(req.params.userId, function(response){
//     res.send(response);
//   });
// };



