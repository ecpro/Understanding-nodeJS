var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// import all the routes
var dishRouter = require('./routes/dishRouter');
var leaderRouter = require('./routes/leaderRouter');
var promoRouter = require('./routes/promoRouter');
var users = require('./routes/users');
var routes = require('./routes/index');

var app = express();

app.all('*', function (req, res, next) {
  console.log('req start: ', req.secure, req.hostname, req.url, app.get('port'));
  if (req.secure) {
    return next();
  };

  res.redirect('https://' + req.hostname + ':' + app.get('secPort') + req.url);
});

// import config from config.js
var config = require('./config');

// connect to mongodb database
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error'));
db.once('open', function () {
  console.log("connected to database server succesfully");
});

// templating engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// passport config
var User = require('./models/user');
app.use(passport.initialize());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// add routers to the application
app.use('/', routes);
app.use('/users', users);
app.use('/dishes', dishRouter());
app.use('/promotions', promoRouter());
app.use('/leadership', leaderRouter());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;