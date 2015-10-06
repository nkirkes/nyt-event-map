app.models.eventListing = Backbone.Model.extend({
	defaults: function() {
		return {
			id: null,
			name: 'Unknown'
		};
	},
	urlRoot: 'http://api.nytimes.com/svc/events/v2/listings.json?api-key=1b6ec24de1512db2fae47f5165ce39ea%3A6%3A69563513',
    url: function() {
        return this.urlRoot;
    }
});