'use strict';

var models = require('../models');

module.exports = {
    index: function(req, res) {
        models.Movie.find({}, function(err, data) {
            res.json(data);
        });
    },
    getById: function(req, res) {
        models.Movie.find({
            _id: req.params.id
        }, function(err, movie) {
            if (err) {
                res.json({
                    error: 'Movie not found.'
                });
            } else {
                res.json(movie);
            }
        });
    },
    add: function(req, res) {
        var newMovie = new models.Movie(req.body);
        if (newMovie.name === undefined) {
            return false;
        }
        newMovie.save(function(err, movie) {
            if (err) {
                res.json({
                    error: 'Error adding movie.'
                });
            } else {
                res.json(movie);
            }
        });
    },
    // update: function(req, res) {
    //     console.log(req.body);
    //     models.Movie.update({ _id: req.body.id }, req.body, function(err, updated) {
    //         if (err) {
    //             res.json({error: 'Movie not found.'});
    //         } else {
    //             res.json(updated);
    //         }
    //     })
    // },
    delete: function(req, res) {
        models.Movie.findOne({
            _id: req.params.id
        }, function(err, movie) {
            if (err) {
                res.json({
                    error: 'Movie not found.'
                });
            } else {
                movie.remove(function() { //err, movie) {
                    res.json(200, {
                        status: 'Success'
                    });
                });
            }
        });
    }
};