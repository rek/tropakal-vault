'use strict';

var mongoose = require('mongoose'),
    models = require('./models');

module.exports = {
    check: function() {
        models.Movie.find({}, function(err, movies) {
            if (movies.length === 0) {
                console.log('no movies found, seeding...');
                var newMovie = new models.Movie({
                    name: 'Ocean\'s Eleven',
                    year: '1007982000',
                    imdb: 'http://www.imdb.com/title/tt0240772',
                    tropes: []
                });
                newMovie.save(function(err, movie) {
                    console.log('successfully inserted movie: ' + movie._id);
                });

                newMovie = new models.Movie({
                    name: 'Ocean\'s Eleven',
                    year: '-296481600',
                    imdb: 'http://www.imdb.com/title/tt0054135',
                    tropes: []
                });
                newMovie.save(function(err, movie) {
                    console.log('successfully inserted movie: ' + movie._id);
                });
            } else {
                console.log('found ' + movies.length + ' existing movies!');
            }
        });

        models.Trope.find({}, function(err, tropes) {
            if (tropes.length === 0) {
                console.log('no tropes found, seeding...');
                var newTrope = new models.Trope({
                    name: 'Getting the gang back together',
                    children: []
                });
                newTrope.save(function(err, trope) {
                    console.log('successfully inserted trope: ' + trope._id);
                });
            } else {
                console.log('found ' + tropes.length + ' existing tropes!');
            }


        });
    }
};