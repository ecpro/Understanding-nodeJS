var express = require('express');
var bodyParser = require('body-parser');
var Dishes = require('./../models/dishes-3');

module.exports = function () {

    var dr = express.Router();

    dr.use(bodyParser.json());

    dr.route('/')
        .get(function (req, res, next) {
            Dishes.find({}, function (err, response) {
                if (err) throw err;
                res.json(response);
            });
        })

        .post(function (req, res, next) {
            Dishes.create(req.body, function (err, dish) {
                if (err) throw err;
                console.log('dish created');
                var id = dish.id;

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });

                res.end('Added dish with id ' + id);
            })
        })

        .delete(function (req, res, next) {
            Dishes.remove({}, (err, response) => {
                if (err) throw err;
                res.send(response);
            });
        });

    dr.route('/:dishId')
        .get(function (req, res, next) {
            Dishes.findById(req.params.dishId, (err, dish) => {
                if (err) throw err;
                res.json(dish);
            })
        })
        .put(function (req, res, next) {
            Dishes.findByIdAndUpdate(req.params.dishId, {
                $set: req.body
            }, { new: true }, (err, dish) => {
                if (err) throw err;
                res.json(dish);
            })
        })

        .delete(function (req, res, next) {
            Dishes.findByIdAndRemove(req.param.dishId, (err, dish) => {
                if (err) throw err;
                console.log(`dish with dish id ${dish.id} deleted`);
                res.json(dish);
            })
        });

    dr.route('/:dishId/comments')
        .get(function (req, res, next) {
            Dishes.findById(req.params.dishId, function (err, dish) {
                if (err) throw err;
                res.json(dish.comments);
            });
        })
        .post(function (req, res, next) {
            Dishes.findById(req.params.dishId, (err, dish) => {
                if (err) throw err;
                dish.comments.push(req.body);
                dish.save((err, dish) => {
                    if (err) throw err;
                    console.info('comment added');
                    res.json(dish);
                });
            });
        })
        .delete(function (req, res, next) {
            Dishes.findById(req.params.dishId, (err, dish) => {
                if (err) throw err;
                if (dish.comments) {
                    dish.comments.splice(0, dish.comments.length);
                }
                dish.save((err, dish) => {
                    if (err) throw err;
                    res.end('deleted all comments');
                });
            });
        });

    dr.route('/:dishId/comments/:commentId')
        .get(function (req, res, next) {
            Dishes.findById(req.params.dishId, (err, dish) => {
                res.json(dish.comments.id(req.params.commentId));
            });
        })
        .put(function (req, res, next) {
            Dishes.findById(req.params.dishId, (err, dish) => {
                if (err) throw err;
                dish.comments.id(req.params.commentId).remove();
                dish.comments.push(req.body);
                dish.save(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Comments!');
                    res.json(dish);
                });
            });
        })
        .delete(function (req, res, next) {
            Dishes.findById(req.params.dishId, (err, dish) => {
                dish.comments.id(req.params.commentId).remove();
                dish.save(function(err, dish) {
                    if(err) throw err;
                    console.log('comment deleted');
                    res.json(dish);
                });
            });
        });

    return dr;
};



