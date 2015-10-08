var app = (function() { 

    // let's create some scope and declare a few functions
    var api = {
        views: {},
        models: {},
        collections: {},
        content: null,
        router: null,
        eventListings: null,
        init: function() {
            this.content = $("#content");
            this.eventListings = new api.collections.eventListings();
            //this.eventListings.fetch();
            Backbone.history.start();
            return this;
        },
        changeContent: function(el) {
            this.content.empty().append(el);
            return this;
        }
    };

    // init views
    var ViewFactory = {
        list: function() {
            if(!this.listView) {
                this.listView = new api.views.list({
                    model: api.eventListings
                });
            }
            return this.listView;
        },
        map: function() {
            if(!this.mapView) {
                this.mapView = new api.views.map({
                    //model: api.eventListings // this should be it's own map/marker model to hold data req'd by Google to render
                });
            }
        }
    };
    
    // init routing
    var Router = Backbone.Router.extend({
        routes: {
            "event/:index": "show",
            "": "list"
        },
        list: function() {
            var view = ViewFactory.list();
            api.changeContent(view.$el);
            view.render();
        },
        map: function() {
            // this will need to take the place of the list view, or find a new element to update.
            //var view = ViewFactory.map();
            //api.changeContent(view.$el);
            //view.render();
        },
        show: function() {}
    });

    api.router = new Router();
    return api;
 
})();