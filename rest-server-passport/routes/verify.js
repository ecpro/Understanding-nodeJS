var User = require('../models/user');
var jwt = require('jsonwebtoken');
var config = require('../config');

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey, { expiresIn: 3600 });
}

exports.VerifyOrdinaryUser = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, config.secretKey, function (err, decoded) {
            if (err) {
                var err = new Error("You are not authenticated");
                err.status = 401;
                return next(err);
            }
            else {
                req.decoded = decoded;
                next();
            }
        })
    }
    else {
        var err = new Error('No tokens provided');
        err.status = 403;
        return next(err);
    }
};

exports.VerifyAdmin = function (req, res, next) {
    if(req.decoded._doc.admin) {
        next();
    }
    else {
        var err = new Error('You are not authorized to perform this operation!');
        err.status = 403;
        return next(err);
    }
};