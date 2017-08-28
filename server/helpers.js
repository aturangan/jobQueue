//import request from 'request';
const Queue = require('./queue.js');
const bodyParser = require('body-parser');

let jobId = 1;
const queue = new Queue();

module.exports.createJob = (req, res) => {  
  queue.enqueue(jobId);

  res.send({
    jobId: jobId++,
    url: req.body.url,
    html: '',
    completed: false
  });
};

module.exports.jobUpdate = (req, res) => {
  console.log('HEWWWWOO', req.params.id); 

//   const id = req.params.id;

//   client.get(`jobId-${id}`, (err, reqUrl) => {
//     if (err) {
//       res.status(400);
//     } else {
//       client.exists(reqUrl, (error, reply) => {
//         res.send(!!reply);
//       });
//     };
//   })
// }

}


/*********** END **************/
