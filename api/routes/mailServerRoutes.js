'use strict';
module.exports = function(app) {
	var mailList = require('../controllers/mailServerController');

	app.route('/inboxMail')
	.get(mailList.list_all_mail)

	app.route('/inboxMail/:userId')
	.get(mailList.inbox_mail_with_id)

	app.route('/sentMail/:userId')
	.get(mailList.sent_mail_with_id)

	app.route('/deletedMail/:userId')
	.get(mailList.delete_mail_with_id)
};