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

		var infoContent = '<div id="content">'+
			'<h1>' + self.marker.title + '</h1>'+
			'<div>'+ self.marker.descr + '</div>'+
			'</div>';

		// hook the infoWindow desciption
		self.marker.infoWindow = new google.maps.InfoWindow({
	    	content: infoContent
	    });

		// wire the marker events
		google.maps.event.addListener(self.marker, 'mouseover', self.showEventInfo);
      	google.maps.event.addListener(self.marker, 'mouseout', self.hideEventInfo);
      	google.maps.event.addListener(self.marker, 'click', self.showEventDetails);
	},

	render: function() { },

    hideEventInfo: function() {
      this.infoWindow.close();
    },

    showEventInfo: function() {
      this.infoWindow.open(this.map, this);
    },

    showEventDetails: function() {
    	console.dir(this.infoWindow)
    	// TODO: let's show some additional detail in another view/pane
    }
});