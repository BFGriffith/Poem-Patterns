var express = require('express');
var request = require('request');

module.exports = function(app) {
  // rhymes
  app.post('/getRhymes', function(req, res, next) {
  	console.log(req.body);
    request('http://rhymebrain.com/talk?function=getRhymes&lang=en&word=' + req.body.word, function(error, response, body) {
      if (error) {
        return console.log('Error:', error);
      }
      // check for status code
      if (response.statusCode !== 200) {
        return console.log('Invalid status-code returned: ', response.statusCode);
      }
      console.log(body);
       res.send(body);
    }); // END request
  }); // END app.get


  // app.get('/getRhymes', function(req, res) {
  //   req.logout();
  //   res.send('/limerick');
  // });



}; // END module.exports(app)
