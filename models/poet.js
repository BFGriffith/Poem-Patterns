// MODELS: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoetSchema = new Schema({
	username: String,
	password: String,
  anthology: [],
  comments: [{ body: String, author: String, date: Date }]
});

module.exports = mongoose.model('Poet', PoetSchema);
