var express = require('express');
var bodyParser = require('body-parser');

module.exports = function () {

    var lr = express.Router();
    lr.use(bodyParser.json());

    lr.route('/')
        .all(function (req, res, next) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            next();
        })

        .get(function (req, res, next) {
            res.end('Will send all the leadership to you!');
        })

        .post(function (req, res, next) {
            res.end('Will add the leadership: ' + req.body.name + ' with details: ' + req.body.description);
        })

        .delete(function (req, res, next) {
            res.end('Deleting all leadership');
        });

    lr.route('/:id')
        .all(function (req, res, next) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            next();
        })

        .get(function (req, res, next) {
            res.end('Will send details of the leadership: ' + req.params.id + ' to you!');
        })

        .put(function (req, res, next) {
            res.write('Updating the leadership: ' + req.params.id + '\n');
            res.end('Will update the leadership: ' + req.body.name +
                ' with details: ' + req.body.description);
        })

        .delete(function (req, res, next) {
            res.end('Deleting leadership: ' + req.params.id);
        });

    return lr;
};