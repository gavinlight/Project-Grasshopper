App.SearchController = Ember.Controller.extend({
    /* Dependencies */
    needs: ['answers', 'application'],

    /* Values */
    keywordsArray: [],

    /* Actions */
    actions: {

        specialSearchAnswers: function(){
            var specialSearchFormData = this.getInput('.naturalLanguageForm .inputKeyword');
            this.searchAnswers(specialSearchFormData);
        },

        regularSearchAnswers: function(){
            var regularSearchFormData = this.getInput('.normalForm .regularSearch');
            this.searchAnswers(regularSearchFormData);
        },

        switchSearchBar: function(searchBarToSwitchTo){

            if(searchBarToSwitchTo === 'special'){
                $('#searchForm .regular').addClass('hidden');
                $('#searchForm .special').removeClass('hidden');
            } else if(searchBarToSwitchTo === 'regular'){
                $('#searchForm .regular').removeClass('hidden');
                $('#searchForm .special').addClass('hidden');
            }

        }

    },

    init: function(){
        this.set('suggestions', this.store.findAll('answer'));
    },

    /* Custom functions */
    getInput: function(selector){
        var inputArray = [];

        $(selector).each(function(){
            var value = $(this).val();

            if(value){
                inputArray.push(value);
            }
        });

        return inputArray;
    },

    setKeywordsArray: function(formData){
        var keywordsArray = [];

        for(var i = 0; i < formData.length; i++){
            var formInput = formData[i];
            var formInputWords = formInput.split(' ');

            if(keywordsArray.indexOf(formInput) <= -1){
                keywordsArray.push(formInput);
            }

            for(var j = 0; j < formInputWords.length; j++){
                var formInputWord = formInputWords[j];

                if(keywordsArray.indexOf(formInputWord) <= -1) {
                    keywordsArray.push(formInputWord);
                }
            }
        }

        this.keywordsArray = keywordsArray;
    },

    searchAnswers: function(formData){
        this.setKeywordsArray(formData);

        if(this.formIsComplied()){
            var relevantAnswers =  App.Answer.findRelevantAnswers(this.keywordsArray);
            var that = this;

            relevantAnswers.then(function(loadedAnswers){
                // TODO: Animatie tonen (en verbergen) zoekresultaten
                if(loadedAnswers){
                    that.set('searchResults', loadedAnswers);

                } else {
                    that.set('searchResults', false);
                }
            });

        } else {
            // TODO: Proper feedback
            //alert('Niet alle belangrijke velden zijn ingevoerd');
        }
    },

    formIsComplied: function(){
        // TODO: Fix zodat deze ingevuld kan worden met minstens een ingevuld veld IPV alle velden
        for(var input_key in this.keywordsArray){
            if(this.keywordsArray.hasOwnProperty(input_key) && !this.keywordsArray[input_key]){
                return false;
            }
        }

        return true;
    }
});