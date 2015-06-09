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

                that.hideSearchResults();

                if(loadedAnswers){
                    that.set('searchResults', loadedAnswers);
                    that.insertSearchResultsDialog(loadedAnswers.length);
                } else {
                    that.set('searchResults', true);
                    that.insertSearchResultsDialog(0);
                }

                that.showSearchResults();

            });

        } else {
            this.hideSearchResults();
            this.set('searchResults', false);
            this.get('controllers.application').insertDialog('Niet alle velden zijn ingevoerd');
        }
    },

    hideSearchResults: function(){
        $('.searchResults.results').fadeOut(500);
    },

    showSearchResults: function(){
        $('.searchResults.results').fadeIn(500);
    },

    insertSearchResultsDialog: function(searchResultsAmount){
        if(Number(parseFloat(searchResultsAmount)) === searchResultsAmount){

            var extraSearchResultsAmount = 2;

            if(this.get('controllers.application.userIsLoggedIn')){
                extraSearchResultsAmount = 1;
            }

            this.get('controllers.application').insertDialog('Er is/zijn ' + (searchResultsAmount + extraSearchResultsAmount) + ' resulat(en) gevonden');

        }
    },

    formIsComplied: function(){
        return this.keywordsArray.length >= 1;
    }
});