app.views.eventListView = Backbone.View.extend({
	
	initialize: function(options) {
		var self = this;

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

		google.maps.event.addListener(this.map, "dragend", this.dragMap);
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
    },

	addEvent : function(eventItem){
        var markerView = new app.views.eventMarkerView({ model: eventItem, map: this.map });
    },

	render: function() {
		this.model.each(this.addEvent, this);
	},

	dragMap: function() {
		var center = this.center;
		console.dir(center.lat());
		console.dir(center.lng());
		// need to re-fetch list and re-render markers
	}
});