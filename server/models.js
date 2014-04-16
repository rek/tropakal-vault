'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    // ObjectId = Schema.ObjectId;

var Trope = new Schema({
    name:      { type: String },
    children: []
});

var Movie = new Schema({
    name:      { type: String },
    imdb:      { type: String },
    year:      { type: Date },
    tropes:    []
});

module.exports = {
    Trope: mongoose.model('Trope', Trope),
    Movie: mongoose.model('Movie', Movie)
};
