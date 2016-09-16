// dependencies: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
var express  = require('express');
var path = require('path');
var flash = require('connect-flash');
var fs = require('fs');
var app = express(); // create app with Express
var port = process.env.PORT || 3000;
var morgan   = require('morgan'); // log requests to the console (Express4)
var bodyParser = require('body-parser'); // pull information from HTML POST (express4)
var passport = require('passport');
var session = require('express-session');
// var orm = require('./config/orm.js');

// MongoDB CONFIG:
require('./config/connection.js');

// override with POST having ?_method=DELETE
// app.use(methodOverride('_method'))

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// MIDDLEWARE:
// app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded()); // parse application/x-www-form-urlencoded
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// session is used to keep the user logged in:
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true}))

// flash to show a message on an incorrect login:
app.use(flash());

// passport middleware methods:
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public')); // set the static files location
// ROUTES: »»——————————————————►
require('./routes/HTMLroutes.js')(app);
require('./routes/APIroutes.js')(app);

// MODELS:
// app.use('/models/poet', users);
// app.use('/models/poems', poems);
// app.use('/models/annotations', annotations);


// CONTROLLERS: Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
// require('./controllers/usersController.js');
// require("./controllers/poetryAnthologiesController.js")(app);

// listener (start application with node server.js) Ø₪₪₪₪§╣ΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞΞ>
app.listen(port);
console.log("application listening on port " + port);
