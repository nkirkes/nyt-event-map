app.views.eventMarkerView = Backbone.View.extend({
	initialize: function(options) {
		console.dir('eventMarkerView init()');
		var self = this;

		self.map = options.map;
		self.marker = new google.maps.Marker({
	        map: self.map,
	        position: new google.maps.LatLng(this.model.latitude, this.model.longitude),
	        title: self.model.name,
	        descr : self.model.get('description'), // TODO: change this to event desc
	        id : self.model.get('id')
	    });

		// hook the infoWindow desciption
		self.marker.infowindow = new google.maps.InfoWindow({
	    	content: self.marker.descr
	    });

		// wire the marker events
		google.maps.event.addListener(self.marker, 'mouseover', self.showEventInfo);
      	google.maps.event.addListener(self.marker, 'mouseout', self.hideEventInfo);
      	google.maps.event.addListener(self.marker, 'click', self.showEventDetail);
	},

	render: function() { }
});