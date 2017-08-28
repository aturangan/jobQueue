//const express = require('express');
//const router = express.Router();
//import { createJob } from './helpers.js';
const express = require('express');
const router = express.Router();
const createJob = require('./helpers').createJob;
const jobUpdate = require('./helpers').jobUpdate; 


router.get('/', (req, res) => {
  res.render('index.html')
});

//router.get('/jobs/:id', getJobStatus);
router.post('/jobs', createJob);
router.get('/jobs/:id', jobUpdate);

//router.get('/redirect/:id', goToSite);

//router.post('/worker', changeWorkerFrequency);

//router.get('/*', (req, res) => {
  //res.redirect('/');
//})

module.exports = router;

//****** END ******











// const express = require('express');
// const router = express.Router();
// import { createJob, getJobStatus, goToSite, changeWorkerFrequency } from './helpers.js';

// router.get('/', (req, res) => {
//   res.render('index.html')
// });

// router.get('/jobs/:id', getJobStatus);
// router.post('/jobs', createJob);

// router.get('/redirect/:id', goToSite);

// router.post('/worker', changeWorkerFrequency);

// router.get('/*', (req, res) => {
//   res.redirect('/');
// })

// module.exports = router;