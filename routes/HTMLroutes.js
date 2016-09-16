// var fs = require('fs');
//var passport = require('passport');
//var LocalStrategy = require('passport-local').Strategy;
// var orm = require('../config/orm.js');
// var db = mongoose(uristring, ['poets']);

// ROUTES: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var express = require('express');
// load all Mongoose Schemas in the models directory
// fs.readdirSync(__dirname + '../models').forEach(function(filename){
//   if (~filename.indexOf('.js')) require(__dirname + '../models/' + filename)
// });
var mongo = require('mongodb');
var assert = require('assert');
require('../config/connection.js');

var UserModel = require('../models/poet.js');
var PoemModel = require('../models/poems.js');

// var database = require('../controllers/poetryAnthologiesController.js');


//Setting the strategy for Passport
/*
passport.use(new LocalStrategy({ passReqToCallback: true },
  function(req, username, password, done) {

    //Searching the ORM for the user in the database
    orm.findUser(username, function(err, user) {
      user = user[0];
      if (err) {
        return done(err); }
      if (!user) {
        return done(null, false); }
      // comparing user passwords, return if not a match
      if (password !== user.password) {
        return done(null, false); }
      return done(null, user);
    });
  }
));

// these two methods are required to keep the user logged in via the session
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

*/

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index', {
      actionBtn: 'signin',
      message: req.flash('error')[0],
      otherAction: "signup"
    });
  });
  app.get('/anthology', function(req, res) {
    res.render('anthology', {poems: poemsArray});
  });
  app.get('/aboutPoementor', function(req, res) {
    res.render('aboutPoementor', {});
  });
  app.get('/poemSelector', function(req, res) {
    res.render('poemSelector', {});
  });
  app.get('/learnMetricalFeet', function(req, res) {
    res.render('learnMetricalFeet', {});
  });
  app.get('/haiku', function(req, res) {
    res.render('haiku', {});
  });
  app.get('/limerick', function(req, res) {
    res.render('limerick', {});
  });
  app.get('/shakespearean', function(req, res) {
    res.render('shakespearean', {});
  });

  //GETs
  app.get('/users', function(req, res) {
    mongoose.model('users').findOne(function(err, users) {
      res.send(users);
    });
  });

  app.get('/signin', function(req, res) {
    res.render('index', {
      signinBtn: 'signin'
    });
  });

  app.get('/authenticated', function(req, res) {
    if (req.isAuthenticated()) {
      res.render('authenticated', {
        username: req.user.username
      })
    } else {
      res.redirect('/')
    }
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('poetryAnthology', function(req, res, next){
    var poemsArray = [];
    mongo.connect(uristring, function(err, db){
      assert.equal(null, err);
      var cursor = db.collection('poems').find();
      cursor.forEach(function(doc, err){
        assert.equal(null, err);
        poemsArray.push(doc);
      }, function(){
        db.close();
        res.render('anthology', {poems: poemsArray});
      });
    })
  }); // END poetryAnthology

  // POSTs
  app.post('/signin', function(req, res) {
    console.log(req.body);

    //findOne if 
    // 

    if (req.body.username) {
      res.json(res.user);
    } else {
      res.send("login successful");
    }
    // function authenticate(name, pass, fn) {
    //   db.Poet.findOne({ username: name }, function(err, user) {
    //     if (!user) return fn(new Error('cannot find that poet in our anthologies'));
    //     if (req.body.password !== Poet.password) {
    //      return fn(null, user);
    //       fn(new Error('invalid password'));
    //     } else {
    //      res.sendFile(__dirname + '/public/views/authenticated.html');
    //     }
    //     })
    //   }
    // }

    //here make a function to searchd database that checks to see if that username exist
    // if it does then check the password if the password is the same as the one in your database they are in.
    //UserModel.find()


  }); // END signin

  app.post('/signup', function(req, res) {
    //Here make the same function to check if the username exist
    // if is does then let them know its taken,
    // if it doesnt then go head and make the account.
    var userInfo = req.body;
    var newUser = new UserModel(userInfo);
    newUser.save(function(err, data) {
      if (err) return console.error(err);
      res.json(data);
    });


  }); // END signup

  app.post('/savePoem', function(req, res, next){
    var poemInfo = req.body;
    console.log(req.body);
    var newPoem = new PoemModel(poemInfo);
    newPoem.save(function(err, data){
      if (err) return console.error(err);
      res.json(data);
    });
    res.redirect('/anthology');
  }); // END savePoem


// Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
}; // END module.exports(app)
