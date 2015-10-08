app.views.eventListView = Backbone.View.extend({
	markers: [],

	initialize: function(options) {
		var self = this;

		self.map = options.map;

		// get an initial set of data
		this.model.fetch({
			success: function (collection, response) {
				self.render();
			},
			error: function (collection, response) {
				console.dir(response);
			}
		});

		self.initMap();
	},

	initMap: function() {
		var self = this;

        // start in NYC
        var center = new google.maps.LatLng(self.model.latitude, self.model.longitude);
        var mapOptions = {
            center: center,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);

		google.maps.event.addListener(self.map, 'dragend', function() {
			self.clearMarkers();
	        self.dragMap(this.center, map, self);
	    });
    },

	addEventMarker : function(eventItem){
        var markerView = new app.views.eventMarkerView({ model: eventItem, map: this.map });
        this.markers.push(markerView);
    },

	render: function() {
		this.model.each(this.addEventMarker, this);
	},

	dragMap: function(latLng, map, t) {
		console.dir(latLng);

		// set new latlong
		this.model.configure({ latitude: latLng.lat(), longitude: latLng.lng() });
		
		// refetch
		this.model.fetch({
			success: function (collection, response) {
				t.render();
			},
			error: function (collection, response) {
				console.dir(response);
			}
		});
	},

	// this is ugly. Has to be a better way to get to the marker...
	clearMarkers: function() {
		this.markers.forEach(function(marker) { marker.marker.setMap(null); });
	}
});