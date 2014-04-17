'use strict';

var express = require('express'),
    http = require('http'),
    // path = require('path'),
    routes = require('./routes'),
    seeder = require('./seeder'),
    // dustjs = require('adaro'),
    mongoose = require('mongoose'),
    app = express();

app.set('port', process.env.PORT || 3300);

// app.set('views', __dirname + '/views');
//Sets up Global Variables to be used in all views
// dust.makeBase({
// copy: '&copy; 2014 beak labs'
// });

// app.engine('dust', dustjs.dust({}));
// app.set('view engine', 'dust');

// For rendering precompiled templates:
// app.engine('js', dustjs.js({ ... ));
// app.set('view engine', 'js');

// app.use('/', express.static(path.join(__dirname, 'public')));
app.use(require('express-subdomain-handler')({
    baseUrl: 'api.localhost',
    prefix: 'api',
    logger: true
}));

var allowedHost = {
    'http://api.localhost:3300': true,
    'http://localhost:9000': true,
};
var allowCrossDomain = function(req, res, next) {
    if (allowedHost[req.headers.origin]) {
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
        next();
    } else {
        res.send(403, {
            auth: false,
            // origin: req.headers
        });
    }
};

app.configure(function() {
    app.use(express.logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded());
    app.use(express.methodOverride());
    app.use(express.cookieParser('Mmmn cookies, better keep them secret!'));
    app.use(allowCrossDomain);
    app.use(app.router);
});

// development only
if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

//connect to the db server:
mongoose.connect('mongodb://localhost/tropakalv');
mongoose.connection.on('open', function() {
    console.log('Connected to Mongoose...');

    // check if the db is empty, if so seed it with some contacts:
    seeder.check();
});

//routes list:
routes.initialize(app);

//finally boot up the server:
http.createServer(app).listen(app.get('port'), function() {
    console.log('Server up: http://localhost:' + app.get('port'));
});