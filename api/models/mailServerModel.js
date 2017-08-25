'use strict';

const util = require('util');
const fs = require('fs');
const SimpleParser = require('mailparser').simpleParser;
const MailParser = require('mailparser').MailParser;
const Mbox = require('node-mbox');

var MailList = function(){};


MailList.prototype.inboxList = function (id, func, callback) {
	if (!id){	
		console.log("not get id");
	}else{
		console.log("get id: " + id);
	}

	var handle = fs.createReadStream(__dirname + '/../../asset/inbox.mbox');
	var messages = [];
	var messageTotal = 0;
	var messageCount = 0;
	var mbox = new Mbox();

	mbox.on('message', function(msg) {
	  // parse message using MailParser
	  var mailparser = new MailParser({ streamAttachments : true });
	  mailparser.on('end', function(mail) {
	  	if(id){
	  		// mail.to.forEach(function(value){
	  		// 	console.log
	  		// });
	  		console.log("check id");
	  		switch(func){
	  			case "inbox":
				  	if(id===mail.to[0].address){
			  			messages.push(mail);
			  		};
			  		break;
	  			case "sent":
	  				if(id===mail.from[0].address){
			  			messages.push(mail);
			  		};
			  		break;
			  	default:
			  		console.log("func error");
	  		}

	  	}else{
	  		messages.push(mail);
	  	}

	  	messageCount++;
	  	if (messageCount===messageTotal) {
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
		messageTotal = parsedCount;
	});

	mbox.on('error', function(err) {
		return callback("Format transform error");
	}); 

	
	handle.pipe(mbox);
	
};

MailList.prototype.deleteList = function (id, func, callback) {
	var handle = fs.createReadStream(__dirname + '/../../asset/delete.mbox');
	var messages = [];
	var messageTotal = 0;
	var messageCount = 0;
	var mbox = new Mbox();

	mbox.on('message', function(msg) {
	  // parse message using MailParser
	  var mailparser = new MailParser({ streamAttachments : true });
	  mailparser.on('end', function(mail) {
	  	// console.log(mail);
	  	if(id){
	  		// mail.to.forEach(function(value){
	  		// 	console.log
	  		// });
	  		console.log("check id");
	  		switch(func){
	  			case "inbox":
				  	if(id===mail.to[0].address){
			  			messages.push(mail);
			  		};
			  		break;
	  			case "sent":
	  				if(id===mail.from[0].address){
			  			messages.push(mail);
			  		};
			  		break;
			  	default:
			  		console.log("func error");
	  		}

	  	}else{
	  		messages.push(mail);
	  	}

	  	messageCount++;
	  	if (messageCount===messageTotal) {
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
		messageTotal = parsedCount;
	});

	mbox.on('error', function(err) {
		return callback("Format transform error");
	}); 

	
	handle.pipe(mbox);


}



module.exports = new MailList();

