'use strict';

var home = require('./controllers/home'),
    movies = require('./controllers/movies');

module.exports.initialize = function(app) {

    app.options('/', function(req, res) {
        // At this point, the `allowCrossDomain()` middleware will already have
        // taken care of the CORS stuff, so just return OK.
        res.send(200);
    });

    app.get('/api/:api/', function(req, res, next){

        // for the example url this will print 'mysubdomain'
        // res.send(req.params.thesubdomain);
        return home.index();

    });

    app.get('/', home.index);
    app.get('/movies', movies.index);
    app.get('/api/:api/movies/:id', movies.getById);
    app.post('/api/movies', movies.add);
    // app.put('/api/movies', movies.update);
    app.delete('/api/movies/:id', movies.delete);
};
