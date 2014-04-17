'use strict';
define(['app'], function(App) {
    App.module('MovieApp.List.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'movie_layout',

            regions: {
                panelRegion: '#panel-region',
                movieRegion: '#content'
            },

            flash: function(cssClass) { // fade in and out.
                var $view = this.$el;
                $view.hide().toggleClass(cssClass).fadeIn(800, function() {
                    setTimeout(function() {
                        $view.toggleClass(cssClass);
                    }, 500);
                });
            }
        });

        // View.Panel = Marionette.ItemView.extend({
        //     template: panelTpl,

        //     triggers: {
        //         'click button.js-new': 'movie:new'
        //     },

        //     events: {
        //         'submit #filter-form': 'filterMovies'
        //     },

        //     ui: {
        //         criterion: 'input.js-filter-criterion'
        //     },

        //     filterMovies: function(e){
        //         e.preventDefault();
        //         var criterion = this.$('.js-filter-criterion').val();
        //         this.trigger('movies:filter', criterion);
        //     },

        //     onSetFilterCriterion: function(criterion){
        //         this.ui.criterion.val(criterion);
        //     }
        // });

        View.Movie = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'movie_list_one',

            events: {
                'click': 'highlightName',
                'click td a.js-show': 'showClicked',
                'click button.js-delete': 'deleteClicked'
            },

            highlightName: function() {
                this.$el.toggleClass('warning');
            },

            showClicked: function(e) {
                e.preventDefault();
                e.stopPropagation();
                this.trigger('movie:show', this.model);
            },

            deleteClicked: function(e) {
                e.stopPropagation();
                this.trigger('movie:delete', this.model);
            },

            remove: function() { // automatically called when this model is destroy() 'ed
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });

        var NoMovieView = Marionette.ItemView.extend({
            template: 'movie_none',
            // tagName: 'div',
            className: 'alert'
        });

        View.Movie = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'movie_list',
            emptyView: NoMovieView,
            itemView: View.Movie ,
            itemViewContainer: '.movie_list',

            initialize: function() {
                this.listenTo(this.collection, 'reset', function() {
                    App.log('reset called', 'movie list view', 1);
                    this.appendHtml = function(collectionView, itemView) { //, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },

            onCompositeCollectionRendered: function() {
                App.log('rendered called', 'movie list view', 1);
                this.appendHtml = function(collectionView, itemView) { //, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });
    });

    return App.MovieApp.List.View;
});