App.ResultsController = Ember.Controller.extend({
    needs: ['application'],

    getCategory: function(){
        console.log(this.get('controllers.application').currentUser());
    }
});