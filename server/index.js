var express = require('express');
var bodyParser = require('body-parser');
var items = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/queue', function (request, response) {
  //const url = request.body.input; 

  console.log(request.body);
  response.send('POST REQUESTTTT WORKINGGG YAYYAYYAYA');




});

app.listen(1337, function() {
  console.log('listening on port 1337!');
});

