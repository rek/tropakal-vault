define(['app'], function(App) {
    'use strict';
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Entity';
        Entities.Trope = Backbone.Model.extend({
            urlRoot: 'trope',

            defaults: {
                name: '',
                slug: ''
            },

            validate: function(attrs) { // , options
                var errors = {};
                if (!attrs.fileName) {
                    errors.fileName = 'can\'t be blank';
                }
                //     if (! attrs.somethingelse) {
                //       errors.lastName = 'can't be blank';
                //     }
                //     else{
                //       if (attrs.somethingelse.length < 2) {
                //         errors.somethingelse = 'is too short';
                //       }
                //     }
                if (!_.isEmpty(errors)) {
                    return errors;
                }
            }
        });

        Entities.TropeCollection = Backbone.Collection.extend({
            url: '/',
            model: Entities.Trope
        });

        var initializeTropes = function() {
            App.log('Initializing Fake Tropes', contextName, 1);

            var fakeTropes = new Entities.TropeCollection([{
                name: 'First Trope',
                slug: 'page-1'
            }, {
                name: 'Second Trope',
                slug: 'page-2'
            }]);

            return fakeTropes;
        };

        var API = {
            getTropeEntities: function() {
                App.log('trope:entities event detected', contextName, 1);
                var tropeCollection = new Entities.TropeCollection();
                var defer = $.Deferred();
                tropeCollection.fetch({
                    complete: function() {
                        defer.resolve(tropeCollection); // send back the collection
                    },
                    // success: function(data){
                    //     App.log('success data', contextName, 1);
                    //     defer.resolve(data);
                    // }
                });
                // chain the above promise,
                var promise = defer.promise();
                $.when(promise).done(function(tropeCollection) {
                    // check to see if it had content:
                    if (tropeCollection.length === 0) { // if not, get defaults.
                        // FAKE NETWORK LAG
                        setTimeout(function() {
                            // App.trigger('page:register', models); // add each trope to the menu
                            // if we don't have any imageCollection yet, create some for convenience
                            tropeCollection.reset(initializeTropes().models); // update the collection
                        }, 2000);

                    }
                });
                return promise;
            },

        };

        App.reqres.setHandler('trope:entities', function() {
            return API.getTropeEntities();
        });

        // App.reqres.setHandler('trope:entity', function(id) {
        // return API.getTropeEntity(id);
        // });

        App.reqres.setHandler('images:entity:new', function(id) {
            App.log('Making new image: ' + id, this.name, 1);
            return new Entities.Trope();
        });
    });

    return;
});