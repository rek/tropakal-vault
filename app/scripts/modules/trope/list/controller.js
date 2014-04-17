'use strict';
define(['app', 'list_view'], function(App, View) {
    App.module('TropeApp.List', function (List, App, Backbone, Marionette, $) { // , _
        List.Controller = {
            listTrope: function() {
                require(['common/views', 'entities_trope'], function(CommonViews) {

                    App.mainRegion.show(new CommonViews.Loading());

                    var fetchingTrope = App.request('trope:entities');

                    var tropeListLayout = new View.Layout();
                    // var tropeListPanel = new View.Panel();

                    $.when(fetchingTrope).done(function(trope) {
                        // App.log('Fetched trope data', 'App', 1);

                        var tropeListView = new View.Trope({
                            collection: trope
                        });

                        // tropeListLayout.on('show', function() {
                        //   tropeListLayout.panelRegion.show(tropesListPanel);
                        //   tropeListLayout.tropeRegion.show(tropeListView);
                        // });

                        // tropeListView.on('itemview:trope:show', function(childView, model) {
                        //   App.trigger('trope:show', model.get('id'));
                        // });

                        tropeListView.on('itemview:trope:delete', function(childView, model) {
                            // auto magically call's remove in the view.
                            model.destroy();
                        });

                        // when the data is here, show it in this region
                        tropeListLayout.tropeRegion.show(tropeListView);

                    });

                    // show the whole layout
                    App.mainRegion.show(tropeListLayout);

                });
            }
        };
    });
    return App.TropeApp.List.Controller;
});