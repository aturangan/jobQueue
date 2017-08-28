const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use('/', routes);

app.listen(1337, function() {
  console.log('listening on port 1337!');
});