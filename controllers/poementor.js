// MAIN controller: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var express = require('express');
var router = express.Router();
var burger = require('../models/poems.js');

router.get('/', function(req,res) {
		res.render('index');
});

module.exports = router;