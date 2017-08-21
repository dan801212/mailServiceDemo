'use strict';

const util = require('util');
const fs = require('fs');
const simpleParser = require('mailparser').simpleParser;
const MailParser = require('mailparser').MailParser;
const Mbox = require('node-mbox');


var MailList = function(){};

MailList.prototype.inboxList = function (callback) {

	// console.log(inboxFile);
	let inboxFile = fs.createReadStream(__dirname + '/../../asset/inbox.mbox');

	simpleParser(inboxFile, (err, mail)=>{
		console.log("simpleParser");
		return callback(mail);
	});




	// var messages = [];
	// var total = Infinity;
	// var mbox = new Mbox(inboxFile);
	// mbox.on('message', function(msg) {
	// 	console.log(msg);
	//   // parse message using MailParser
	//   var mailparser = new MailParser({ streamAttachments : true });
	//   mailparser.on('end', function(mail) {
	//   	messages.push(mail);
	//   	// if (messages.length == messageCount) {
	//   		console.log('Finished parsing messages');
	//   		console.log(mail);
	//   		console.log(messages);
	//   	// }
	//   	callback(messages);
	//   });
	//   mailparser.write(msg);
	//   mailparser.end();
	// });

	// mbox.on('end', function(parsedCount) {
	// 	console.log('Completed Parsing mbox File.');
	// 	// messageCount = parsedCount;
	// });



	

};

module.exports = new MailList();
