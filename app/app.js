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
        show: function() {}
    });

    api.router = new Router();
    return api;
 
})();