var UserModel = require('../models/poet.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var orm = require('../config/orm.js');

//Setting the strategy for Passport
passport.use(new LocalStrategy({passReqToCallback : true},
  function(req, username, password, done) {

  	//Searching the ORM for the user in the database
  	orm.findUser(username, function(err, user){
  		user = user[0];
  		if (err) { return done(err); }
      if (!user) { return done(null, false); }
      // comparing user passwords, return if not a match
      if (password !== user.password) { return done(null, false);}
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

module.exports = function(app){
	//GETs
	app.get('/', function(req, res){
		res.render('index', {
			welcomeText: "Sign In",
			actionBtn: 'signin',
			message: req.flash('error')[0],
			otherAction: "Signup"
		});
	});

	app.get('/signin', function(req, res){
		res.redirect('/')
	});

	app.get('/signup', function(req, res){
		res.render('index', {
			welcomeText: "Sign Up",
			actionBtn: 'signup',
			otherAction: "Signin"
		});
	});

	app.get('/authenticated', function(req,res){
		if (req.isAuthenticated()) {
			res.render('authenticated', {
				username: req.user.username
			})
		} else {
			res.redirect('/')
		}
	});

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});

	//POSTs
	//	app.post('/signin', passport.authenticate('local',{failureRedirect:'/', failureFlash:'Wrong Username or Password'}), function(req, res){
	app.post('/signin', function(req, res){
		// res.redirect('/authenticated');
		//here make a function to searchd database that checks to see if that username exist
		// if it does then check the password if the password is the same as the one in your database they are in.
		//UserModel.find()

		console.log(req.body);
	});

	app.post('/signup', function(req, res){
		//Here make the same function to check if the usename exist
		// if is does then let them know its taken,
		// if it doesnt then go head and make the account.

    // var newUser = new UserModel({})
    
    // newUser.save = Mongoose function...
		// var user = new UserModel(req.body);
		// UserModel.saveUser(user, function(status){
		// 	if(!status) {
		// 		res.redirect('/signup')
		// 		return false
		// 	}
		// 	res.redirect('/');
		// });
		console.log(req.body);
	});

};