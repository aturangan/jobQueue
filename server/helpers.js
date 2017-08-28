const Queue = require('./queue.js');
const Crawler = require('crawler');
const bodyParser = require('body-parser');
const db = require('../database-mongo/index.js');

let jobId = 0;
const queue = new Queue();

module.exports.createJob = (req, res) => {  
  jobId++; 

  let jobDetails = {
    jobId: jobId,
    url: req.body.url,
    html: ''
  };

  queue.enqueue(jobDetails); 

  res.send({
    jobId: jobId,
    url: req.body.url,
    html: '',
    completed: false
  });

  getHTML(jobDetails); 
};

const getHTML = (jobDetails) => {
  let crawl = new Crawler({
    maxConnections: 10,
    callback: (err, res, done) => {
      if (err) {
        console.log(err); 
        res.status(400);
      } else {
        let DB = new db({
          jobId: jobDetails.jobId,
          url: jobDetails.url,
          html: res.body
        });

        DB.save(err => {
          if (err) {
            console.log('Error Saving to Database', err);
          } else {
            console.log('Successfully Saved to Database');
          }
        }); 
      }

      done(); 
    }
  });

  crawl.queue(jobDetails.url);   
};

module.exports.jobUpdate = (req, res) => {
  const id = req.params.id; 

  db.findOne({ jobId: id }, (error, wasFound) => {
    if (error) { 
      res.status(400); 
      throw new Error('Database Error');
    } else {
      res.send(wasFound); 
    } 
  });
};

module.exports.showHTML = (req, res) => {
  const id = req.params.id;

  db.findOne({ jobId: id }, (error, wasFound) => {
    if (error) {
      res.status(400); 
      throw new Error('HTML Not Found in DB'); 
    } else {
      res.send(wasFound);
    }
  });
};
