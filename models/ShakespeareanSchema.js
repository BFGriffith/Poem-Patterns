var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShakespeareanSchema = new Schema({
  poets: [{
    type: Schema.Types.ObjectId,
    ref: 'Poet'
  }],
  ShakespeareanSonnets: [{
    ShakespeareanSonnet: [
      ShakespeareanSonnetLine1: String,
      ShakespeareanSonnetLine2: String,
      ShakespeareanSonnetLine3: String,
      ShakespeareanSonnetLine4: String,
      ShakespeareanSonnetLine5: String,
      ShakespeareanSonnetLine6: String,
      ShakespeareanSonnetLine7: String,
      ShakespeareanSonnetLine8: String,
      ShakespeareanSonnetLine9: String,
      ShakespeareanSonnetLine10: String,
      ShakespeareanSonnetLine11: String,
      ShakespeareanSonnetLine12: String,
      ShakespeareanSonnetLine13: String,
      ShakespeareanSonnetLine14: String
    ],
    poet: Object
  }],
  annotations: [{
    poemAnnotatedTitle: String,
    annotation: String,
    poet: Object
  }]
});

module.exports = mongoose.model('Shakespearean', ShakespeareanSchema);
