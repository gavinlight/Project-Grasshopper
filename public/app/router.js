App.Router.map(function() {
    this.resource('search');
    this.route('login');
    this.resource('answers', function(){
        this.route('show', {path: '/:id/:slug'})
    });
});

App.ApplicationRoute = Ember.Route.extend({
    beforeModel: function(){
        return this.store.findAll('answer');
    }
});

App.IndexRoute = Ember.Route.extend({
    beforeModel: function(){
        this.transitionTo('search');
    }
});

App.AnswersIndexRoute = Ember.Route.extend({
    model: function(){
        return this.store.findAll('answer');
    }
});

App.AnswersShowRoute = Ember.Route.extend({
    model: function(params){
        return this.store.find('answer', params.id);
    }
});