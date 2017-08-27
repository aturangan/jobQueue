const express = require('express');
const bodyParser = require('body-parser');
const request = require('request'); 
const axios = require('axios');
const Crawler = require('crawler');
const db = require('../database-mongo');

const app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.post('/queue', (request, response) => {
  const url = request.body.input; 
  console.log('url: ', url); 

  let crawl = new Crawler({
    maxConnections: 10,
    callback: (err, res, done) => {
      if (err) {
        console.log(error); 
      } else {
        let $ = res.$;
        //db.save(res.body); 
        //save res.body to database
        //response.send(res.body);

        let DB = new db({
          //id: //index that's created??
          url: url,
          html: res.body
        });

        DB.save(err => {
          if (err) {
            console.log('Error: ', err);
          } else {
            console.log('successfully saved to db');
          }
        }); 
      }

      done(); 
    }
  });

  crawl.queue(url);   
});

app.listen(1337, function() {
  console.log('listening on port 1337!');
});

