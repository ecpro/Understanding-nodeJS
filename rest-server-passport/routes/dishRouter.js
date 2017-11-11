var express = require('express');
var bodyParser = require('body-parser');
var Dishes = require('./../models/dishes-3');
var Verify = require('./verify');

module.exports = function () {

    var dr = express.Router();

    dr.use(bodyParser.json());

    dr.route('/')
        .get(Verify.VerifyOrdinaryUser, function (req, res, next) {
            Dishes.find({})
                .populate('comments.postedBy')
                .exec(function (err, dishes) {
                    if (err) throw err;
                    res.json(dishes);
                });
        })
        .post(Verify.VerifyOrdinaryUser, Verify.VerifyAdmin, function (req, res, next) {
            Dishes.create(req.body, function (err, dish) {
                if (err) throw err;
                console.log('dish created');
                var id = dish._id;

                res.writeHead(200, {
                    'Content-Type': 'text/plain'
                });

                res.end('Added dish with id ' + id);
            })
        })
        .delete(Verify.VerifyOrdinaryUser, Verify.VerifyAdmin, function (req, res, next) {
            Dishes.remove({}, (err, response) => {
                if (err) throw err;
                res.send(response);
            });
        });
    dr.route('/:dishId')
        .get(Verify.VerifyOrdinaryUser, function (req, res, next) {
            Dishes.findById(req.params.dishId).populate('comments.postedBy').exec((err, dish) => {
                if (err) throw err;
                res.json(dish);
            })
        })
        .put(Verify.VerifyOrdinaryUser, Verify.VerifyAdmin, function (req, res, next) {
            Dishes.findByIdAndUpdate(req.params.dishId, {
                $set: req.body
            }, { new: true }, (err, dish) => {
                if (err) throw err;
                res.json(dish);
            })
        })

        .delete(Verify.VerifyOrdinaryUser, Verify.VerifyAdmin, function (req, res, next) {
            Dishes.findByIdAndRemove(req.param.dishId, (err, dish) => {
                if (err) throw err;
                console.log(`dish with dish id ${dish.id} deleted`);
                res.json(dish);
            })
        });
    dr.route('/:dishId/comments')
        .all(Verify.VerifyOrdinaryUser)
        .get(function (req, res, next) {
            Dishes.findById(req.params.dishId).populate('comments.postedBy').exec(function (err, dish) {
                if (err) throw err;
                res.json(dish.comments);
            });
        })
        .post(function (req, res, next) {
            Dishes.findById(req.params.dishId, (err, dish) => {

                req.body.postedBy = req.decoded._doc._id;
                console.log("comment posted by : ", req.body.postedBy);
                if (err) throw err;
                dish.comments.push(req.body);
                dish.save((err, dish) => {
                    if (err) throw err;
                    console.info('comment added');
                    res.json(dish);
                });
            });
        })
        .delete(Verify.VerifyAdmin, function (req, res, next) {
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
        .all(Verify.VerifyOrdinaryUser)
        .get(function (req, res, next) {
            Dishes.findById(req.params.dishId).populate('comments.postedBy').exec((err, dish) => {
                res.json(dish.comments.id(req.params.commentId));
            });
        })
        .put(function (req, res, next) {
            // We delete the existing commment and insert the updated
            // comment as a new comment
            Dishes.findById(req.params.dishId, function (err, dish) {
                if (err) throw err;
                dish.comments.id(req.params.commentId).remove();
                req.body.postedBy = req.decoded._doc._id;
                dish.comments.push(req.body);
                console.log("dish comment modified by ", req.body.postedBy);
                dish.save(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Comments!');
                    res.json(dish);
                });
            });
        })
        .delete(function (req, res, next) {
            Dishes.findById(req.params.dishId, function (err, dish) {
                if (dish.comments.id(req.params.commentId).postedBy
                    != req.decoded._doc._id) {
                    var err = new Error('You are not authorized to perform this operation!');
                    err.status = 403;
                    return next(err);
                }
                dish.comments.id(req.params.commentId).remove();
                dish.save(function (err, resp) {
                    if (err) throw err;
                    res.json(resp);
                });
            });
        });

    return dr;
};



