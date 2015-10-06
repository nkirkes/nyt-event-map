app.views.list = Backbone.View.extend({
	events: {},
	
	initialize: function() {
		var self = this;

		// initialize to NYC
		this.model.configure({
			"latitude": "40.7127",
			"longitude": "-74.0059"
		});
		
		// get an initial set of data
		this.model.fetch({
			success: function (collection, response) {
				console.dir(collection);
				console.dir(response);
				self.render();
			},
			error: function (collection, response) {
				console.log(response);
			}
		});
	},

	render: function() {
		var html = '<ul class="events">';
		this.model.each(function(eventItem, index) {
			var template = _.template($("#event-tpl").html());
			html += template({
				name: eventItem.get("name"),
				index: index
			});
		});
		html += '</ul>';
		this.$el.html(html);		
		return this;
	}
});