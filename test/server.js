//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

//Our parent block
describe('Mails', () => {

  /*
  * Test the /GET route
  */
  describe('/GET mail', () => {
      it('it should GET all the mails', (done) => {
        chai.request(server)
            .get('/inboxMail')
            .end((err, res) => {
                res.should.have.status(200);
                // res.body.should.be.a('array');
                // res.body.length.should.be.eql(0);
              done();
            });
      });
  });

});