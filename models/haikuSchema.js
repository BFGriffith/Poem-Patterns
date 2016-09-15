var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HaikuSchema = new Schema({
  user: String,
	poets: Array,
	haikuPoems: Array,
  annotations: Array
});

module.exports = mongoose.model('Haiku', HaikuSchema);