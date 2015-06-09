App.ApplicationController = Ember.Controller.extend({

    suggestions: false,
    currentUser: false,
    currentPeriod: 'landelijke',

    init: function(){
        this._super();
        this.set('suggestions', this.store.findAll('answer'));
    },

    actions: {

        logout: function(){
            this.set('currentUser', false);
            this.transitionToRoute('login');
        }

    },

    userIsLoggedIn: function(){
        return this.get('currentUser') !== false;
    }.property('currentUser'),

    getLowestGradeClass: function(){
        var currentUser = this.get('currentUser');

        if(currentUser && currentUser.hasOwnProperty('grades') && typeof currentUser.grades === 'object'){
            var grades = currentUser.grades;
            return Object.keys(grades).sort(function(a,b){return grades[a]-grades[b]})[0];
        }
    }.property('currentUser'),

    showSimilarAnswers: function(){
        return this.get('currentPath') === 'answers.show';
    }.property('currentPath'),

    insertDialog: function(content){
        this.removeDialogs();
        $('<div class="dialogWindow">' + content + ' <span class="closeDialog">X</span></div>').appendTo('body').fadeIn(500);
    },

    removeDialogs: function(){
        $('.dialogWindow').remove();
    }
});