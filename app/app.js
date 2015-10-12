var app = (function() { 

    // let's create some scope and declare a few functions
    var api = {
        views: {},
        models: {},
        collections: {},
        content: null,
        router: null,
        eventList: null,
        map: null,
        init: function() {
            this.content = $("#content");
            this.eventList = new api.collections.eventList();
            Backbone.history.start();
        },
        filterResults: function() {
            console.dir(this);
        }
    };

    // init views
    var ViewFactory = {
        listView: function() {
            if(!this.eventListView) {
                this.eventListView = new api.views.eventListView({
                    model: api.eventList
                });
            }
            return this.eventListView;
        }
    };
    
    // init routing
    var Router = Backbone.Router.extend({
        routes: {
            "": "listView"
        },
        listView: function() {
            var view = ViewFactory.listView({ map: this.map });
            view.render();
        }
    });

    api.router = new Router();
    return api;
 
})();