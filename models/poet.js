var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PoetSchema = new Schema({
  name: {
    first: String,
    last: { type: String, trim: true }
  },
  email: String,
  anthology: [],
  comments: [{ body: String, author: String, date: Date }]
});

module.exports = mongoose.model('Poet', UserSchema);
