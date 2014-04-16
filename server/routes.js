'use strict';

var home = require('./controllers/home'),
    movies = require('./controllers/movies');

module.exports.initialize = function(app) {
    app.get('/', home.index);
    app.get('/api/movies', movies.index);
    app.get('/api/movies/:id', movies.getById);
    app.post('/api/movies', movies.add);
    // app.put('/api/movies', movies.update);
    app.delete('/api/movies/:id', movies.delete);
};
