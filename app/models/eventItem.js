app.models.eventItem = Backbone.Model.extend({
	defaults: function() {
		return {
			id: null,
			name: 'Unknown',
			description: '',
			latitude: null,
			longitude: null
		};
	}
});