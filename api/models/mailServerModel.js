'use strict';

const util = require('util');
const fs = require('fs');
const SimpleParser = require('mailparser').simpleParser;
const MailParser = require('mailparser').MailParser;
const Mbox = require('node-mbox');

var MailList = function(){};


MailList.prototype.inboxList = function (query, callback) {
	console.log(query);
	var handle = fs.createReadStream(__dirname + '/../../asset/inbox.mbox');
	var messages = [];
	var messageTotal = 0;
	var messageCount = 0;
	var mbox = new Mbox();

	if(query.folder){
		handle = fs.createReadStream(__dirname + '/../../asset/' + query.folder + '.mbox');
	}

	mbox.on('message', function(msg) {
	  // parse message using MailParser
	  var mailparser = new MailParser({ streamAttachments : true });
	  mailparser.on('end', function(mail) {
	  	var messageCheckFlag = true

	  	if(query.from){
	  		var tempText = mail.from[0].address.toLowerCase();
	  		if(!tempText.includes(query.from.toLowerCase()))
	  			messageCheckFlag = false;
		}
		if(query.to){
	  		var tempText = mail.to[0].address.toLowerCase();
	  		if(!tempText.includes(query.to.toLowerCase()))
	  			messageCheckFlag = false;
		}
		if(query.subject){
	  		var tempText = mail.subject.toLowerCase();
	  		if(!tempText.includes(query.subject.toLowerCase()))
	  			messageCheckFlag = false;
		}
		if(query.content){
			var tempText = mail.text.toLowerCase();
	  		if(!tempText.includes(query.content.toLowerCase()))
	  			messageCheckFlag = false;
		}

	  	if(messageCheckFlag){
	  		messages.push(mail);
	  	}

	  	messageCount++;
	  	if (messageCount===messageTotal) {
	  		console.log('Number of mail after filter: ' + messages.length);
	  		// console.log(messages);
	  		return callback(messages);
	  	}
	  });
	  mailparser.write(msg);
	  mailparser.end();
	});

	mbox.on('end', function(parsedCount) {
		console.log('Total mail: ' + parsedCount);
		messageTotal = parsedCount;
	});

	mbox.on('error', function(err) {
		return callback("Format transform error");
	}); 

	
	handle.pipe(mbox);
	
};


module.exports = new MailList();








