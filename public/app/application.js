var App = Ember.Application.create();

App.ApplicationAdapter = DS.RESTAdapter.reopen({
    namespace: 'api/v1'
});