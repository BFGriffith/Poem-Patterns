// modules:
var request = require('request');
var mongoose = require('mongoose');
var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    'mongodb://localhost/poetryAnthologies';

mongoose.connect(uristring, function (err, res) {
      if (err) {
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });

// SCHEMA Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var poetSchema = new mongoose.Schema({
      name: {
        first: String,
        last: { type: String, trim: true }
      },
      email: String,
      anthology: [],
      comments: [{ body: String, author: String, date: Date }]
    });

// mongoose.connect('mongodb://localhost/poetryAnthologies');

// MongoDB configuriation:
// var databaseUrl = "poetryAnthologies";
// var collections = ["poets"];

// use mongoose to hook the database to the db variable
// var db = mongoose(databaseUrl, collections);

// this makes sure that any errors are logged if mongodb runs into an issue
// db.on('error', function(err) {
//   console.log('Database Error: ', err);
// });

// Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
module.exports = function(app) {

  app.get('/', function(req, res) {
    db.poets.find({}, function(err, data) {
      if (err) throw err;
      // console.log(data)
      res.render('index', {
        results: data
      });
    });
  });
}; // END module.exports »»——————————————————►