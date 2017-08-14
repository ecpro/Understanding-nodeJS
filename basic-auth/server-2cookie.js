var express = require('express'),
    logger = require('morgan'),
    // include cookie parser
    cookieParser = require('cookie-parser');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(logger('dev'));
app.use(cookieParser('piyush')); // secret key

function auth(req, res, next) {
    console.log(req.headers);
    if (!req.signedCookies.user) {
        var authHeader = req.headers.authorization;
        if (!authHeader) {
            var err = new Error("You are not authenticated");
            err.status = 401;
            next(err);
        }
        var auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];

        if (user === 'admin' && pass === 'password') {
            console.log('user authenticated succesfully');
            res.cookie('user', 'admin', { signed: true });
            next(); // authorized
        }
        else {
            var err = new Error("You are not authenticated");
            err.status = 401 ;
            next(err);
        }
    }
    else {
        if (req.signedCookies.user === 'admin') {
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

app.use(function (err, req, res, next) {
    res.writeHead(err.status || 500, {
        'WWW-Authenticate': 'Basic',
        'Content-Type': 'text/plain'
    });
    res.end(err.message);
});

app.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});