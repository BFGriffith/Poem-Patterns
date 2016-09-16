// Annotations (comments) MODEL: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoemSchema = new Schema({
  _creator: [{ type: Number, ref: 'User' }],
  poemTitle: { type: String, default: "untitled" },
  poeticalForm: String,
  poemText: { type: Array, required: true },
  date: { type: Date, default: Date.now }
});

var Poem = mongoose.model('poems', PoemSchema)
module.exports = Poem;
