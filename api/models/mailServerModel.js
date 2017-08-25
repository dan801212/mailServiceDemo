'use strict';

const util = require('util');
const fs = require('fs');
const SimpleParser = require('mailparser').simpleParser;
const MailParser = require('mailparser').MailParser;
const Mbox = require('node-mbox');

var messageCount = 0;
var MailList = function(){};

MailList.prototype.inboxList = function (callback) {

	// console.log(inboxFile);
	var messages = [];
	var total = Infinity;
	var mbox = new Mbox();
	var handle = fs.createReadStream(__dirname + '/../../asset/inbox.mbox');
	
	mbox.on('message', function(msg) {
	  // parse message using MailParser
	  var mailparser = new MailParser({ streamAttachments : true });
	  mailparser.on('end', function(mail) {
	  	messages.push(mail);
	  	if (messages.length == messageCount) {
	  		console.log('Finished parsing messages');
	  		// console.log(messages);
	  		return callback(messages);
	  	}
	  });
	  mailparser.write(msg);
	  mailparser.end();
	});

	mbox.on('end', function(parsedCount) {
		console.log('Completed Parsing mbox File.');
		messageCount = parsedCount;
	});
	
	handle.pipe(mbox);
	
};

module.exports = new MailList();

