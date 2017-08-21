'use strict';

const util = require('util');
const fs = require('fs');
const simpleParser = require('mailparser').simpleParser;

let input = fs.createReadStream(__dirname + '/../../asset/inbox.mbox');

simpleParser(input).then(mail => {
    console.log(util.inspect(mail, false, 22));
}).catch(err => {
    console.log(err);
});

// module.exports = ;