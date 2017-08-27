//Require the dev-dependencies
let chai = require('chai');
let should = chai.should();
let chaiHttp = require('chai-http');
let Mail = require('../api/models/mailServerModel');

chai.use(chaiHttp);

//Our parent block
describe('Mails', () => {

  /*
  * Test the query response
  */
  describe('/inboxMail GET function', () => {
    it('it should GET all the mails', (done) => {
      var query = "";
      Mail.inboxList(query, (response) => {
        response.length.should.eql(4);
        done()
      });  
    });

    it('it should GET the mails from specific address', (done) => {
      var query = {"from": "ash"};
      Mail.inboxList(query, (response) => {
        response.length.should.eql(1);
        done()
      });  
    });

    it('it should GET the mails to specific address', (done) => {
      var query = {"to": "recipient"};
      Mail.inboxList(query, (response) => {
        response.length.should.eql(1);
        done()
      });  
    });

    it('it should GET the mails contain specific text in subject', (done) => {
      var query = {"subject": "Linux and Windows"};
      Mail.inboxList(query, (response) => {
        response.length.should.eql(1);
        done()
      });  
    });

    it('it should GET the mails contain specific text in content', (done) => {
      var query = {"content": "PDT"};
      Mail.inboxList(query, (response) => {
        response.length.should.eql(2);
        done()
      });  
    });

    it('it should GET the mails in delete.mbox which contains 3 mails', (done) => {
      var query = {"folder": "delete"};
      Mail.inboxList(query, (response) => {
        response.length.should.eql(2);
        done()
      });  
    });

    it('it should not GET any mail due to the wrong file name', (done) => {
      var query = {"folder": "test"};
      Mail.inboxList(query, (response) => {
        response.length.should.eql(0);
        done()
      });  
    });
  });

});