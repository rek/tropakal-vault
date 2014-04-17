define(['app'], function(App) {
    'use strict';
    App.module('Entities', function(Entities, App, Backbone, Marionette, $, _) {
        var contextName = 'Entity';
        Entities.Movie = Backbone.Model.extend({
            urlRoot: 'movie',

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

        Entities.MovieCollection = Backbone.Collection.extend({
            url: '/api/movies',
            model: Entities.Movie
        });

        var initializeMovies = function() {
            App.log('Initializing Fake Movies', contextName, 1);

            var fakeMovies = new Entities.MovieCollection([{
                name: 'First Movie',
                slug: 'page-1'
            }, {
                name: 'Second Movie',
                slug: 'page-2'
            }]);

            return fakeMovies;
        };

        var API = {
            getMovieEntities: function() {
                App.log('movie:entities event detected', contextName, 1);
                var movieCollection = new Entities.MovieCollection();
                var defer = $.Deferred();
                movieCollection.fetch({
                    complete: function() {
                        defer.resolve(movieCollection); // send back the collection
                    },
                    // success: function(data){
                    //     App.log('success data', contextName, 1);
                    //     defer.resolve(data);
                    // }
                });
                // chain the above promise,
                var promise = defer.promise();
                $.when(promise).done(function(movieCollection) {
                    // check to see if it had content:
                    if (movieCollection.length === 0) { // if not, get defaults.
                        // FAKE NETWORK LAG
                        setTimeout(function() {
                            // App.trigger('page:register', models); // add each movie to the menu
                            // if we don't have any imageCollection yet, create some for convenience
                            movieCollection.reset(initializeMovies().models); // update the collection
                        }, 2000);

                    }
                });
                return promise;
            },

        };

        App.reqres.setHandler('movie:entities', function() {
            return API.getMovieEntities();
        });

        // App.reqres.setHandler('movie:entity', function(id) {
        // return API.getMovieEntity(id);
        // });

        App.reqres.setHandler('images:entity:new', function(id) {
            App.log('Making new image: ' + id, this.name, 1);
            return new Entities.Movie();
        });
    });

    return;
});