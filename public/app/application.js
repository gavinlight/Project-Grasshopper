var App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.reopen({
    namespace: 'api/v1'
});

App.RecommendationAdapter = DS.FixtureAdapter.reopen({
    queryFixtures: function(records, query, type) {
        return records.filter(function(record) {
            for(var key in query) {
                if (!query.hasOwnProperty(key)) { continue; }
                var value = query[key];
                if (record[key] !== value) { return false; }
            }
            return true;
        });
    }
});

Ember.LinkView.reopen({
    action: null,
    _invoke: function(event){
        var action = this.get('action');
        if(action) {
            // There was an action specified (in handlebars) so take custom action
            event.preventDefault(); // prevent the browser from following the link as normal
            if (this.bubbles === false) { event.stopPropagation(); }

            // trigger the action on the controller
            this.get('controller').send(action, this.get('actionParam'));
            return false;
        }

        // no action to take, handle the link-to normally
        return this._super(event);
    }
});
