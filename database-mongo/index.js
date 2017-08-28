var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobQueue');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

const jobSchema = mongoose.Schema({
  jobId: Number,
  url: String,
  html: String,
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;