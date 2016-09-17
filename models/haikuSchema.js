var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HaikuSchema = new Schema({
	haikuPoems: Array,
  annotations: Array,
  user: Schema.ObjectId
});

module.exports = mongoose.model('Haiku', HaikuSchema);