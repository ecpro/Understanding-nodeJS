var express = require('express');
var bodyParser = require('body-parser');
var Promo = require('./../models/promotions');

module.exports = function () {

    var pr = express.Router();
    pr.use(bodyParser.json());

    pr.route('/')
        .get(function (req, res, next) {
            Promo.find({}, (err, promos) => {
                if (err) throw err;
                res.json(promos);
            });
        })

        .post(function (req, res, next) {
            Promo.create(req.body, (err, promos) => {
                if (err) throw err;
                console.info('promos created');
                res.json(promos);
            });
        })

        .delete(function (req, res, next) {
            Promo.remove({}, (err, removed) => {
                if (err) throw err;
                res.json(removed);
            });
        });

    pr.route('/:id')
        .get(function (req, res, next) {
            Promo.findById(req.params.id, (err, promo) => {
                if (err) throw err;
                res.json(promo);
            });
        })

        .put(function (req, res, next) {
            Promo.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, promo) => {
                if (err) throw err;
                res.json(promo);
            });
        })

        .delete(function (req, res, next) {
            Promo.findByIdAndRemove(req.params.id, (err, promo) => {
                if (err) throw err;
                console.log(`promo with promo id ${promo._id} has been deleted`);
                res.json(promo);
            });
        });

    return pr;
};