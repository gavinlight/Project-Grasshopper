App.LoginController = Ember.Controller.extend({
    needs: ['application'],

    userValues: {
        name: 'Roel Smit',
        age: 18,
        level: 'vwo 6',
        grades: {
            'nederlands': 8,
            'engels': 5.3,
            'duits': 6.5,
            'wiskunde a': 7
        },
        situationPercentage: 63
    },

    actions: {

        login: function(){
            var loginForm = this.getProperties(['login', 'password']);

            if(loginForm.login && loginForm.password){
                this.set('controllers.application.currentUser', jQuery.extend(this.get('userValues'), loginForm));
            }

            $('body').append('<div class="dialogWindow">Je bent succesvol ingelogd <span class="closeDialog">X</span></div>');

            this.transitionToRoute('search');
        }

    }

});