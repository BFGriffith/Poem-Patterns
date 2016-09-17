// MongoDB: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var mongoose = require('mongoose'); // mongoose for MongoDB
var request = require('request');

var uristring =
    process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL ||
    "mongodb://heroku_08glv1tz:lhsupj3l9jm1pmfpm6nij6s05t@ds033126.mlab.com:33126/heroku_08glv1tz";

console.log(uristring)

mongoose.connect(uristring);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected");
});