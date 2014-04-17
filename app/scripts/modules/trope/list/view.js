'use strict';
define(['app'], function(App) {
    App.module('TropeApp.List.View', function(View, App, Backbone, Marionette) { // , $, _
        View.Layout = Marionette.Layout.extend({
            template: 'trope_layout',

            regions: {
                panelRegion: '#panel-region',
                tropeRegion: '#content'
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
        //         'click button.js-new': 'trope:new'
        //     },

        //     events: {
        //         'submit #filter-form': 'filterTropes'
        //     },

        //     ui: {
        //         criterion: 'input.js-filter-criterion'
        //     },

        //     filterTropes: function(e){
        //         e.preventDefault();
        //         var criterion = this.$('.js-filter-criterion').val();
        //         this.trigger('tropes:filter', criterion);
        //     },

        //     onSetFilterCriterion: function(criterion){
        //         this.ui.criterion.val(criterion);
        //     }
        // });

        View.Trope = Marionette.ItemView.extend({
            tagName: 'div',
            template: 'list_one',

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
                this.trigger('trope:show', this.model);
            },

            deleteClicked: function(e) {
                e.stopPropagation();
                this.trigger('trope:delete', this.model);
            },

            remove: function() { // automatically called when this model is destroy() 'ed
                var self = this;
                this.$el.fadeOut(function() {
                    Marionette.ItemView.prototype.remove.call(self);
                });
            }
        });

        var NoTropeView = Marionette.ItemView.extend({
            template: 'trope_none',
            // tagName: 'div',
            className: 'alert'
        });

        View.Trope = Marionette.CompositeView.extend({
            tagName: 'div',
            className: '',
            template: 'list',
            emptyView: NoTropeView,
            itemView: View.Trope ,
            itemViewContainer: '.trope_list',

            initialize: function() {
                this.listenTo(this.collection, 'reset', function() {
                    App.log('reset called', 'trope list view', 1);
                    this.appendHtml = function(collectionView, itemView) { //, index) {
                        collectionView.$el.append(itemView.el);
                    };
                });
            },

            onCompositeCollectionRendered: function() {
                App.log('rendered called', 'trope list view', 1);
                this.appendHtml = function(collectionView, itemView) { //, index) {
                    collectionView.$el.prepend(itemView.el);
                };
            }
        });
    });

    return App.TropeApp.List.View;
});