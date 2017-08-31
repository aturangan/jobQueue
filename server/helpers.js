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
  queue.size++; 

  res.send({
    jobId: jobId,
    url: req.body.url,
    html: '',
    completed: false
  });

  this.checkQueue();  
};

module.exports.checkQueue = () => {
  if (queue.data.length > 0) {
    let job = queue.dequeue(); 
    queue.size--; 
    this.getHTML(job); 
  } 
};

module.exports.getHTML = (jobDetails) => {
  request.get(jobDetails.url, (error, response, data) => {
    let html;

    if (!error && response.statusCode == 200) {
      html = data; 
    } else {
      html = '<p>HTML Could Not Be Retrieved</p>'; 
    }

    jobDetails.html = html; 

    this.saveToDB(jobDetails); 
  });
};

module.exports.saveToDB = (jobDetails) => {
  let DB = new db({
    jobId: jobDetails.jobId,
    url: jobDetails.url,
    html: jobDetails.html
  });

  DB.save(err => {
    if (err) {
      console.log('Error Saving to Database', err);
    } else {
      console.log('Successfully Saved to Database');
    }
  }); 

  this.checkQueue(); 
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

module.exports.queue = queue; 
