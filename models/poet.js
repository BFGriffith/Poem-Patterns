// MODELS: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	username: String,
	password: String,
  anthology: Array,
  comments: Array
});

module.exports = mongoose.model('users', UserSchema);
