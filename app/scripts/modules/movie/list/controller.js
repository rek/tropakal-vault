'use strict';
define(['app', 'movie_list_view'], function(App, View) {
    App.module('MovieApp.List', function (List, App, Backbone, Marionette, $) { // , _
        List.Controller = {
            listMovie: function() {
                require(['common/views', 'movie_entities'], function(CommonViews) {

                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingMovie = App.request('movie:entities');

                    var movieListLayout = new View.Layout();
                    // var movieListPanel = new View.Panel();

                    $.when(fetchingMovie).done(function(movie) {
                        // App.log('Fetched movie data', 'App', 1);

                        var movieListView = new View.Movie({
                            collection: movie
                        });

                        // movieListLayout.on('show', function() {
                        //   movieListLayout.panelRegion.show(moviesListPanel);
                        //   movieListLayout.movieRegion.show(movieListView);
                        // });

                        // movieListView.on('itemview:movie:show', function(childView, model) {
                        //   App.trigger('movie:show', model.get('id'));
                        // });

                        movieListView.on('itemview:movie:delete', function(childView, model) {
                            // auto magically call's remove in the view.
                            model.destroy();
                        });

                        // when the data is here, show it in this region
                        movieListLayout.movieRegion.show(movieListView);

                    });

                    // show the whole layout
                    App.mainRegion.show(movieListLayout);

                });
            }
        };
    });
    return App.MovieApp.List.Controller;
});