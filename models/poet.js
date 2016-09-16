// User (poet) MODEL: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
/*
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

function User (userObj) {
	this.username = userObj.username;
	this.password = userObj.password;
}

module.exports = User;

module.exports.saveUser = function(userObj, callback){
	orm.addUserToDB(userObj, function(status, err){
		if (err) return callback(false);
		callback(true);
	});
}
*/


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  anthology: [{ type: Schema.Types.ObjectId, ref: 'poem' }],
  annotations: [{ type: Schema.Types.ObjectId, ref: 'annotation' }]
});

module.exports = mongoose.model('users', UserSchema);

