App.RecommendationsView = Ember.View.extend({

    templateName: 'recommendations',
    recommendations: false,
    type: false,
    inputValue: false,

    actions: {

        loadRecommendations: function(){
            var type = this.get('type');

            this.getInput().blur();
            this.closeAllPopUps();

            if(type){
                var recommendations = this.get('controller').store.find('recommendation', {type: type});

                if(recommendations){
                    this.set('recommendations', recommendations);
                    this.openPopUp();
                }
            }
        },

        chooseRecommendation: function(recommendation){
            var chosenRecommendation = recommendation.get('text');
            this.setInput(chosenRecommendation);
            this.closePopUp();
        },

        noRecommendation: function(){
            this.setInput('');
            this.closePopUp();
        }

    },

    didInsertElement : function(){
        this._super();
        Ember.run.scheduleOnce('afterRender', this, function(){
            this.setInputWidth();
        });
    },

    getInput: function(){
        return this.$('.inputKeyword');
    },

    setInput: function (value){
        this.getInput().val(value);
        this.setInputWidth();
    },

    setInputWidth: function(){
        var input = this.getInput();
        var value = input.val();
        var size  = value.length;

        if(size > 0){
            input.attr('size', size);
        } else {
            input.attr('size', 5);
        }
    },

    openPopUp: function(){
        this.$('.recommendationsPopUp').fadeIn(500);
    },

    closePopUp: function(){
        this.$('.recommendationsPopUp').fadeOut(500);
    },

    closeAllPopUps: function(){
        $('.recommendationsPopUp').fadeOut(500);
    },

    keyDown: function(e){
        var code = e.keyCode || e.which;

        if(code === 13){
            this.freeRecommendation();
        }
    },

    freeRecommendation: function(){
        var freeRecommendation = this.$('.freeRecommendation input[type="text"]').val();
        this.setInput(freeRecommendation);
        this.closePopUp();
    }

});