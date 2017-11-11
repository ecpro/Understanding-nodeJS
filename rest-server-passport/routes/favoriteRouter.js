var express = require('express');
var bodyParser = require('body-parser');
var Favorites = require('./../models/favorites');
var Verify = require('./verify');

module.exports = function () {
    var fr = express.Router();

    fr.use(bodyParser.json());

    fr.route('/')
        .all(Verify.VerifyOrdinaryUser)
        .get(function (req, res, next) {
            Favorites.find({ 'postedBy': req.decoded._doc._id })
                .populate('postedBy')
                .populate('dishes')
                .exec(function (err, favs) {
                    if (err) throw err;
                    res.json(favs);
                });
        })
        .post(function (req, res, next) {
            Favorites.find({ 'postedBy': req.decoded._doc._id }, function (err, fav) {
                if (err) throw err;
                if (fav.length != 0) {
                    console.log('priting fav if exists', fav[0]);
                    fav[0].dishes.push(req.body._id);
                    fav[0].save(function (err, fav) {
                        if (err) throw err;
                        console.log('found fav and added new dish to favorite', fav[0]);
                        res.json(fav);
                    })
                }
                else {
                    Favorites.create({ 'postedBy': req.decoded._doc._id }, function (err, fav) {
                        console.log('printing fav if new ', fav);
                        fav.dishes.push(req.body._id);
                        fav.save(function (err, fav) {
                            if (err) throw err;
                            console.log('added new dish to fav', fav);
                            res.json(fav);
                        });
                    });
                }

            });
        })
        .delete(function (req, res, next) {
            Favorites.remove({ 'postedBy': req.decoded._doc._id }, function (err, fav) {
                if (err) throw err;
                console.log('deleted : ', fav);
                res.json(fav);
            });
        });

    fr.route('/:dishObjectId')
        .all(Verify.VerifyOrdinaryUser)
        .delete(function (req, res, next) {
            Favorites.find({ 'postedBy': req.decoded._doc._id }, function (err, fav) {
                if (err) throw err;
                if (fav.length != 0) {
                    var favorite = fav[0];
                    for (var i = (favorite.dishes.length - 1); i >= 0; i--) {
                        if (favorite.dishes[i] == req.params.dishObjectId) {
                            favorite.dishes.remove(req.params.dishObjectId);
                        }
                    }
                    favorite.save(function (err, resp) {
                        if (err) throw err;
                        res.json(resp);
                    });
                }
            })
        })

    return fr;
}