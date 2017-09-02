var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');
var flash = require('connect-flash');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'Keyboard Cat',
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// passport configuration
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  console.log("serialized user", user);
  done(null, user);
})

passport.deserializeUser(function (user, done) {
  if (user) {
    console.log('user', user);
    if (user.id === 'Piyush') {
      return done(null, user.id);
    }
    else {
      console.log(user);
      return done(user, null);
    }
  };
});


// Local strategy configuration 
passport.use(new LocalStrategy(function (username, password, done) {
  if (username && password) {
    if (username !== "Piyush") {
      console.log("wrong username");
      return done(null, false, { message: "wrong username" });
    }
    if (password !== "Ravi") {
      console.log("wrong password");
      return done(null, false, { message: "wrong password" });
    }
    return done(null, { id: "Piyush" });
  }
  console.log("Username or password cannot be empty");
  return done(null, false, { message: "Username or password cannot be empty" });
}));



app.use('/', index);
app.use('/users', users);
app.use('/login', login);


app.post('/login', passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/users',
  failureFlash: true,
  successFlash: true
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
