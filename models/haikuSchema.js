var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HaikuSchema = new Schema({
	poets: [{
		type: Schema.Types.ObjectId,
		ref: 'Poet'
	}],
	haikuPoems: [{
    haiku: [
      {haikuLine1: String},
      {haikuLine2: String},
      {haikuLine3: String}
    ],
    poet: Object
  }],
  annotations: [{
    poemAnnotatedTitle: String,
    annotation: String,
    poet: Object
  }]
});

module.exports = mongoose.model('Haiku', HaikuSchema);