// MODELS: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// HAIKU:
var HaikuSchema = new Schema({
	haikuTitle: String,
	haikuAuthor: String,
  haikuPoem: [
    {haikuLine1: String},
    {haikuLine2: String},
    {haikuLine3: String}
  ],
  annotations: [{ body: String, poemTitle: String, author: String, date: Date }]
});

module.exports = mongoose.model('Haiku', HaikuSchema);

// LIMERICK:
var LimerickSchema = new Schema({
	limerickTitle: String,
	limerickAuthor: String,
  limerickPoem: [
    {limerickLine1: String},
    {limerickLine2: String},
    {limerickLine3: String},
    {limerickLine4: String},
    {limerickLine5: String}
  ],
  annotations: [{ body: String, poemTitle: String, author: String, date: Date }]
});

module.exports = mongoose.model('Limerick', LimerickSchema);
/*
var orm = require('../config/orm.js');

var haiku = {
	
};

module.exports = poems;
*/