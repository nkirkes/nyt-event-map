app.collections.eventList = Backbone.Collection.extend({
	
	model: app.models.eventItem,
	filters: [],

	// initial values set to NYC
    latitude: "40.7127",
	longitude: "-74.0059",

    initialize: function(){
    	
    },

    setFilters: function(criteria){
    	this.filters = criteria;
    },

    url: function() {
    	// construct endpoint
    	var endpoint = 'http://api.nytimes.com/svc/events/v2/listings.json?api-key=1b6ec24de1512db2fae47f5165ce39ea%3A6%3A69563513'
       	+ '&ll=' + this.latitude + ',' + this.longitude + '&radius=5000';

       	if (this.filters.length > 0) {
		    endpoint += '&filters=category:(';
		    
		    for(var i = 0; i < this.filters.length; i++)
		    {
		    	endpoint += this.filters[i];
		    	if (i < this.filters.length - 1) {
		    		endpoint += '+';
		    	}
		    };
		    endpoint += ')';
		}

		return endpoint;
    },

    configure: function(options) {
		this.latitude = options.latitude;
		this.longitude = options.longitude;
	},
 
	parse: function(response) {
 		if (response.status === "OK") {	
			var events = new Array();
			var self = this;
			_.each(response.results, function(element, index, list) {
				events.push(new app.models.eventItem( {
					"id": element.event_id,
					"name": element.event_name,
					"description": element.web_description,
					"latitude": element.geocode_latitude,
					"longitude": element.geocode_longitude,
					"startDate": element.recurring_start_date,
					category: element.category,
					subcategory: element.subcategory
				}));
			});
			return events;
		} else {
			console.dir(response);
			return [];
		}
	}
});