'use strict';
module.exports = function(app) {
  var mailList = require('../controllers/mailServerController');

  // todoList Routes
  app.route('/inboxMail')
    .get(mailList.list_all_mail)
    .post(mailList.create_a_mail)
    .delete(mailList.delete_a_mail);


  app.route('/deletedMail')
    .get(mailList.list_all_mail)
    .post(mailList.create_a_mail)
    .delete(mailList.delete_a_mail);
};