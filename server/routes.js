const express = require('express');
const router = express.Router();
const createJob = require('./helpers').createJob;
const jobUpdate = require('./helpers').jobUpdate; 
const showHTML = require('./helpers').showHTML; 

router.get('/', (req, res) => {
  res.render('index.html')
});

router.post('/jobs', createJob);

router.get('/jobs/:id', jobUpdate);

router.get('/html/:id', showHTML);

module.exports = router;