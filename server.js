var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  Mail = require('./api/models/mailServerModel'), //created model loading here
  bodyParser = require('body-parser'),
  cors = require('cors');
  

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var routes = require('./api/routes/mailServerRoutes'); //importing route
routes(app); //register the route

app.listen(port);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

console.log('Mail RESTful API server started on: ' + port);