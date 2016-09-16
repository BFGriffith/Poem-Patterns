// Annotations (comments) MODEL: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnnotationSchema = new Schema({
	_creator: [{type: Number, ref: 'User'}],
	comment: String,
	date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('annotation', AnnotationSchema);