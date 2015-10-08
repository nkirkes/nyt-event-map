app.views.eventListView = Backbone.View.extend({
	events: {},
	
	initialize: function(options) {
		var self = this;
		
        // initialize to NYC
		this.model.configure({
			"latitude": "40.7127",
			"longitude": "-74.0059"
		});

		self.map = options.map;

		// get an initial set of data
		this.model.fetch({
			success: function (collection, response) {
				console.dir(collection);
				console.dir(response);
				self.render();
			},
			error: function (collection, response) {
				console.dir(response);
			}
		});

		self.initMap();
	},

	initMap: function() {
        // start in NYC
        var center = new google.maps.LatLng(this.model.latitude, this.model.longitude);
        var mapOptions = {
            center: center,
            zoom: 8
            //mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
    },

	addEvent : function(eventItem){
        var markerView = new app.views.eventMarkerView({ model: eventItem, map: this.map });
    },

	render: function() {
		this.model.each(this.addEvent, this);
	}
});