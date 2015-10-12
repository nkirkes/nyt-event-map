app.views.eventListView = Backbone.View.extend({
	markers: [],
	infoWindow: null,
	el: '#filters',
	events: {
        'click [type="checkbox"]' : 'getFilteredEvents'
    },
	initialize: function(options) {
		this.map = options.map;

		// get an initial set of data
		this.getFilteredEvents();

		this.initMap();
	},

	getFilteredEvents: function(){
		var filterOptions = document.getElementsByName('category');
		var filters = [];
		for (var i = 0; i < filterOptions.length; i++) {
			if (filterOptions[i].checked) {
				filters.push(filterOptions[i].value);
			}
		}
		this.clearMarkers();
		this.model.setFilters(filters);
		this.fetchEvents();
	},

	fetchEvents: function() {
		var self = this;
		this.model.fetch({
			success: function (collection, response) {
				self.render();
			},
			error: function (collection, response) {
				console.dir(response);
			}
		});
	},

	initMap: function() {
		var self = this;

        // start in NYC
        var center = new google.maps.LatLng(this.model.latitude, this.model.longitude);
        var mapOptions = {
            center: center,
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        this.map = new google.maps.Map(document.getElementById('map'), mapOptions);
        
        // global info window
        this.infoWindow = new google.maps.InfoWindow();
		
		google.maps.event.addListener(this.map, 'dragend', function() {
			self.clearMarkers();
	        self.dragMap(this.center, map, self);
	    });
    },

	addEventMarker : function(eventItem){
        var markerView = new app.views.eventMarkerView({ model: eventItem, map: this.map, infoWindow: this.infoWindow });
        this.markers.push(markerView);
    },

	render: function() {
		this.model.each(this.addEventMarker, this);
	},

	dragMap: function(latLng, map, t) {
		// set new latlong
		this.model.configure({ latitude: latLng.lat(), longitude: latLng.lng() });
		
		// refetch
		this.getFilteredEvents();
	},

	// this is ugly. Has to be a better way to get to the marker...
	clearMarkers: function() {
		this.markers.forEach(function(marker) { marker.marker.setMap(null); });
	}
});