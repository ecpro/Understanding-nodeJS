var express = require('express'),
    logger = require('morgan'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session);

var hostname = 'localhost';
var port = 3000;

// express app instance
var app = express();

// logger middleware
app.use(logger('dev'));

// session middleware
app.use(session({
    name: 'session-id',
    secret: '12345-67890-09876-54321',
    saveUninitialized: true,
    resave: true,
    store: new FileStore()
}));

// authentication middleware
function auth(req, res, next) {
    console.log(req.headers);
    if (!req.session.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error("You are not authenticated");
            err.status = 401;
            next(err);
        }
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];

        if (user === 'admin' && pass === 'password') {
            console.log('user authenticated succesfully');
            req.session.user = 'admin';
            next(); // authorized
        }
        else {
            var err = new Error("You are not authenticated");
            err.status = 401;
            next(err);
        }
    }
    else {
        if (req.session.user === 'admin') {
            console.info('req.session ', req.session);
            next();
        }
        else {
            var err = new Error("You are not authenticated");
            err.status = 401;
            next(err);
        }
    }
}


app.use(auth);

app.use(express.static(__dirname + '/public'));

// error handler middleware
app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
})

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});