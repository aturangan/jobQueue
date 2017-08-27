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
  //id: { type: String, unique: true },
  url: String,
  html: String
});

const Job = mongoose.model('Job', jobSchema);

// var selectAll = function(callback) {
//   Item.find({}, function(err, items) {
//     if(err) {
//       callback(err, null);
//     } else {
//       callback(null, items);
//     }
//   });
// };

module.exports = Job;