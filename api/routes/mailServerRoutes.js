'use strict';
module.exports = function(app) {
	var mailList = require('../controllers/mailServerController');

	app.route('/inboxMail')
	.get(mailList.list_all_mail)

	// app.route('/inboxMail/:userId')
	// .get(mailList.inbox_mail_with_id)

};