app.views.eventMarkerView = Backbone.View.extend({
	initialize: function(options) {
		var self = this;

		self.map = options.map;
		self.marker = new google.maps.Marker({
	        map: self.map,
	        position: new google.maps.LatLng(self.model.attributes.latitude, self.model.attributes.longitude),
	        title: self.model.attributes.name,
	        descr : self.model.attributes.description,
	        id : self.model.attributes.id
	    });

		// hook the infoWindow desciption
		self.marker.infowindow = new google.maps.InfoWindow({
	    	content: self.marker.descr
	    });

		// wire the marker events
		google.maps.event.addListener(self.marker, 'mouseover', self.showEventInfo);
      	google.maps.event.addListener(self.marker, 'mouseout', self.hideEventInfo);
	},

	render: function() { },

    hideEventInfo : function() {
      this.infowindow.close();
    },

    showEventInfo : function() {
      this.infowindow.open(this.map, this);
    },
});