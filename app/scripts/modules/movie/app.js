'use strict';
define(function(require) {
    var App = require('app');

    // create a new module
    App.module('App', {
        startWithParent: false,
        // only avaiable with object literal def of module;
        initialize: function(options, moduleName, App) { // on prototype chain thus inheritable
            this.name = moduleName;
            App.log('Initalize: ' + App.getCurrentRoute(), this.name, 2);
        },
        // define: function(MovieApp, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    // create a new sub module
    App.module('Routers.MovieApp', function(MovieAppRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.MovieApp';

        MovieAppRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', MovieAppRouter.name);
                // start ourselves
                // App.switchApp('MovieApp', {});
            },
            appRoutes: {
                '': 'listMovie',
                'movie': 'listMovie',
                // 'movie/create': 'createMovie',
                // 'movie/:slug' : 'showMovie'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('MovieApp');
            action(arg);
            // App.execute('set:active:page', 'movie');
        };

        var API = {
            listMovie : function() {
                require(['movie_list_controller'], function(ListController) {
                    App.log('List movie: Controller loaded, requesting movie..', MovieAppRouter.name, 2);
                    executeAction(ListController.listMovie);
                });
            },
        };

        // also watch for manual events:
        App.on('movie:list', function() {
            App.navigate('/movie');
            API.listMovie();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', MovieAppRouter.name, 2);
            new MovieAppRouter.Router({
                controller: API
            });
        });
    });

    return App.MovieAppRouter;
});