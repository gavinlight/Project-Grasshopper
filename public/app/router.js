App.ResetScroll = Ember.Mixin.create({
    activate: function(){
        this._super();
        window.scrollTo(0,0);
    }
});

App.Router.map(function() {
    this.resource('search');
    this.route('login');
    this.route('results');
    this.resource('answers', function(){
        this.route('show', {path: '/:id/:slug'})
    });
});

App.ApplicationRoute = Ember.Route.extend(App.ResetScroll, {
    beforeModel: function(){
        return this.store.findAll('answer');
    },
    model: function(){
        return Ember.RSVP.hash({
            suggestions: this.store.findAll('answer')
        });
    }
});

App.IndexRoute = Ember.Route.extend(App.ResetScroll, {
    beforeModel: function(){
        this.transitionTo('search');
    }
});

App.SearchRoute = Ember.Route.extend(App.ResetScroll);

App.LoginRoute = Ember.Route.extend(App.ResetScroll);

App.ResultsRoute = Ember.Route.extend(App.ResetScroll, {
    model: function(){
        return Ember.RSVP.hash({
            suggestions: this.store.findAll('answer')
        });
    }
});

App.AnswersIndexRoute = Ember.Route.extend(App.ResetScroll, {
    model: function(){
        return Ember.RSVP.hash({
            answers: this.store.findAll('answer')
        });
    }
});

App.AnswersShowRoute = Ember.Route.extend(App.ResetScroll, {
    model: function(params){
        return Ember.RSVP.hash({
            answer: this.store.find('answer', params.id),
            suggestions: this.store.findAll('answer')
        });
    }
});