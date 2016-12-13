// var fs = require('fs');
// var passport = require('passport');
// var LocalStrategy = require('passport-local').Strategy;
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


// setting the strategy for Passport
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

  // testing logger for router's requests
  app.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
  });
  // Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>

  app.get('/', function(req, res) {
    res.render('index', {
      actionBtn: 'signin',
      message: req.flash('error')[0],
      otherAction: "signup"
    });
  });
  app.get('/anthology', function(req, res) {
    res.render('anthology', {}); // { poems: poemsArray }
  });
  app.get('/aboutPoementor', function(req, res) {
    res.render('aboutPoementor', {});
  });
  app.get('/poemSelector', function(req, res, next) {
    res.render('poemSelector', {});
  });
  app.get('/learnMetricalFeet', function(req, res) {
    res.render('learnMetricalFeet', {});
  });
  app.get('/haiku', function(req, res, next) {
    res.render('haiku', {}); // { poemTitle: poemTitle }
  });
  app.get('/limerick', function(req, res, next) {
    res.render('limerick', {}); // { poemTitle: poemTitle }
  });
  app.get('/shakespearean', function(req, res, next) {
    res.render('shakespearean', {}); // { poemTitle: poemTitle }
  });

  // user authentication:
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
  /*
  app.post('/signin', function(req, res) {
      console.log(req.body);

      //create MongoDB findOne conditional?

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
  */

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

  // render poems
  app.get('poetryAnthology', function(req, res, next) {
    var poemsArray = [];
    mongo.connect(uristring, function(err, db) {
      assert.equal(null, err);
      var cursor = db.collection('poems').find();
      cursor.forEach(function(doc, err) {
        assert.equal(null, err);
        poemsArray.push(doc);
      }, function() {
        db.close();
        res.render('anthology', { poems: poemsArray });
      });
    })
  }); // END poetryAnthology

  // CRUD attempt Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
  // POST - new poem
  app.post('/new', function(req, res, next) {
    // collect data from body
    var name = req.body.username;
    var message = req.body.message;
    // build & populate new user
    var newUser = User({
      name: name,
      message: message
    });
    //save new user & redirect to homepage
    newUser.save(function(err) {
      res.redirect('/');
    });
  });

  // GET - deletes element with :id (dont know why i used destroy > delete.)
  app.get('/:id/destroy', function(req, res) {
    //grab id param
    var id = req.params.id;

    //delete by id
    User.find({ _id: id }).remove().exec();
    res.redirect('/')
  });

  // GET update form for element with :id
  app.get('/:id/update', function(req, res) {
    var id = req.params.id;

    User.findOne({ _id: id }, function(err, post) {
      res.render('update.hbs', { "post": post })
    });
  });

  // POST update submission that updates in mongo
  app.post('/:id/update', function(req, res) {
    // id is found in route params
    var post_id = req.params.id;
    // other data in body
    var new_user = req.body.username;
    var new_message = req.body.message;

    // updates MongoDB element
    User.update({ _id: post_id }, { $set: { user: new_user, message: new_message } }, function(err) {
      res.redirect('/');
    });
  });



  // Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
  // POSTs

  /*
    // simple POST
    app.post('/savePoem', function(req, res, next) {
      var poemInfo = req.body;
      console.log(req.body);
      var poemContent = req.body.poemBody;
      var newPoem = new PoemModel(poemInfo);
      newPoem.save(function(err, data) {
        if (err) return console.error(err);
        res.json(data);
      });
      res.redirect('/anthology');
    }); // END savePoem
  */

  // Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
}; // END module.exports(app)
