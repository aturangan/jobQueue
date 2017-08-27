//import request from 'request';
const Queue = require('./queue.js');
const bodyParser = require('body-parser');

let jobId = 0;
//const jobQueue = new Queue('jobs', client); //uhhh

module.exports.createJob = (req, res) => {  

  //jobQueue.push(jobId);
  //client.set(`jobId-${jobId}`, formattedUrl);
  //res.send('from create job!!! yay');

  res.send({
    jobId: jobId++,
    //url: formattedUrl,
    html: '',
    completed: false
  });
}


// import redis from 'redis';
// import request from 'request';
// import url from 'url';
// import Queue from './queue.js';
// import { setWorkerFrequency } from './job-runner.js'

// let jobId = 0;
// const client = redis.createClient();
// const jobQueue = new Queue('jobs', client); //uhhh

// export const createJob = (req, res) => {  
//   const formattedUrl = url.parse(req.body.url).protocol ? reqUrl : `http://${req.body.url}`

//   jobQueue.push(jobId);
//   client.set(`jobId-${jobId}`, formattedUrl);

//   res.send(JSON.stringify({
//     jobId: jobId++,
//     url: formattedUrl,
//     html: '',
//     completed: false
//   }));
// }
