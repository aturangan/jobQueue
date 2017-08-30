const Queue = require('./queue.js');
const request = require('request');
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

  //get job at the front of the queue
  let job = queue.dequeue(); 

  //send the jobID back to the user, without HTML (job incomplete)
  res.send({
    jobId: jobId,
    url: req.body.url,
    html: '',
    completed: false
  });

  //get the HTML and store results in database
  getHTML(job);  
};

const getHTML = (jobDetails) => {
  request.get(jobDetails.url, (error, response, data) => {
    let html;

    if (!error && response.statusCode == 200) {
      html = data; 
    } else {
      html = '<p>HTML Could Not Be Retrieved</p>'; 
    }

    let DB = new db({
      jobId: jobDetails.jobId,
      url: jobDetails.url,
      html: html
    });

    DB.save(err => {
      if (err) {
        console.log('Error Saving to Database', err);
      } else {
        console.log('Successfully Saved to Database');
      }
    }); 
  });
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
      throw new Error('HTML Not Found in Database'); 
    } else {
      res.send(wasFound);
    }
  });
};
