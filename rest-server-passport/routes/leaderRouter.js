var express = require('express');
var bodyParser = require('body-parser');
var Leaders = require('./../models/leadership');

module.exports = function () {

    var lr = express.Router();
    lr.use(bodyParser.json());

    lr.route('/')
        .get(function (req, res, next) {
            Leaders.find((err, leaders) => {
                if (err) throw err;
                res.json(leaders);
            })
        })

        .post(function (req, res, next) {
            Leaders.create(req.body, (err, leaders) => {
                if (err) throw err;
                console.log('new leaders added');
                res.status(200).end("all the leaders added");
            });
        })

        .delete(function (req, res, next) {
            Leaders.remove({}, (err, response) => {
                if (err) throw err;
                console.log('all leaders assasinated');
                res.json(response);
            });
        });

    lr.route('/:id')
        .get(function (req, res, next) {
            Leaders.findById(req.params.id, (err, leader) => {
                if (err) throw err;
                res.json(leader);
            })
        })
        .put(function (req, res, next) {
            Leaders.findByIdAndUpdate(req.params.id, {
                $set: req.body
            }, { new: true }, (err, leader) => {
                if (err) throw err;
                console.log(`leader with id ${leader._id} updated`);
                res.json(leader);
            });
        })
        .delete(function (req, res, next) {
            Leaders.findByIdAndRemove(req.params.id, function (err, leader) {
                if (err) throw err;
                console.log(`leader with id ${leader._id} deleted`);
                res.json(leader);
            });
        });

    return lr;
};