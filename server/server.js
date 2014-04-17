'use strict';

var express = require('express'),
    http = require('http'),
    path = require('path'),
    routes = require('./routes'),
    seeder = require('./seeder'),
    // dustjs = require('adaro'),
    mongoose = require('mongoose'),
    app = express();

app.set('port', process.env.PORT || 9000);

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

app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Mmmn cookies, better keep them secret!'));
app.use(app.router);
app.use('/', express.static(path.join(__dirname, 'public')));

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