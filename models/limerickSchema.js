var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LimerickSchema = new Schema({
  poets: [{
    type: Schema.Types.ObjectId,
    ref: 'Poet'
  }],
  limericks: [{
    limerick: [{
      limerickStanza1: [
        limerickLine1: String,
        limerickLine2: String,
        limerickLine3: String,
        limerickLine4: String,
        limerickLine5: String,
      ]
    }]
  }],
  annotations: [{
    poemAnnotatedTitle: String,
    annotation: String,
    user: Object
  }]
});

module.exports = mongoose.model('Limerick', LimerickSchema);
