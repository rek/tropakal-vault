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
        // define: function(TropeApp, App, Backbone, Marionette, $, _) { // non inheritable
            // temp stuff for logging
            // TODO: find a better way to get module name
        // }
    });

    // create a new sub module
    App.module('Routers.TropeApp', function(TropeAppRouter, App, Backbone, Marionette) { //, $, _) {
        this.name = 'Routers.TropeApp';

        TropeAppRouter.Router = Marionette.AppRouter.extend({
            initialize: function() {
                // App.log('Before Router', TropeAppRouter.name);
                // start ourselves
                // App.switchApp('TropeApp', {});
            },
            appRoutes: {
                '': 'listTrope',
                'trope': 'listTrope',
                // 'trope/create': 'createTrope',
                // 'trope/:slug' : 'showTrope'
            }
        });

        var executeAction = function(action, arg) {
            App.switchApp('TropeApp');
            action(arg);
            App.execute('set:active:page', 'trope');
        };

        var API = {
            listTrope : function() {
                require(['list_controller'], function(ListController) {
                    App.log('List trope: Controller loaded, requesting trope..', TropeAppRouter.name, 2);
                    executeAction(ListController.listTrope );
                });
            },
        };

        // also watch for manual events:
        App.on('trope:list', function() {
            App.navigate('/trope');
            API.listTrope ();
        });

        App.addInitializer(function() {
            App.log('Initalizer running: Starting Router', TropeAppRouter.name, 2);
            new TropeAppRouter.Router({
                controller: API
            });
        });
    });

    return App.TropeAppRouter;
});