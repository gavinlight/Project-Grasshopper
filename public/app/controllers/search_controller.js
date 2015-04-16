App.SearchController = Ember.ArrayController.extend({
    /* Dependencies */
    needs: ['answers'],

    /* Values */
    keywordsArray: [],

    /* Actions */
    actions: {

        specialSearchAnswers: function(){
            var formData = this.getProperties('level', 'subject', 'class', 'exam');
            this.keywordsArray = Object.keys(formData).map(function (key) {return formData[key]});

            if(this.formIsComplete()){
                var relevantAnswers =  App.Answer.findRelevantAnswers(this.keywordsArray);
                var that = this;

                relevantAnswers.then(function(loadedAnswers){
                    if(loadedAnswers){
                        that.set('content', loadedAnswers);
                    }
                });

            } else {
                // TODO: Proper feedback
                alert('Niet alle belangrijke velden zijn ingevoerd');
            }
        },

        regularSearchAnswers: function(){
            var formData = this.getProperties('regularSearch');
            this.keywordsArray = formData.regularSearch.split(' ');

            if(this.formIsComplete()){
                var relevantAnswers =  App.Answer.findRelevantAnswers(this.keywordsArray);
                var that = this;

                relevantAnswers.then(function(loadedAnswers){
                    if(loadedAnswers){
                        that.set('content', loadedAnswers);
                    }
                });

            } else {
                // TODO: Proper feedback
                alert('Niet alle belangrijke velden zijn ingevoerd');
            }
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

    /* Custom functions */
    formIsComplete: function(){
        for(var input_key in this.keywordsArray){
            if(this.keywordsArray.hasOwnProperty(input_key) && !this.keywordsArray[input_key]){
                return false;
            }
        }

        return true;
    },

    findRelevantAnswers: function(formData){
        var answers = this.get('model');
        var relevantAnswers = [];

        answers.forEach(function(item){
            console.log('ITEM: ' + item);
        });

        if(answers.hasOwnProperty('content')){

            for(var i = 0; i < answers.content.length; i++){
                var answer = answers.content[i];
                var answerKeywords = answer.get('keywordsArray');

                var answerKeywordIntersection = answerKeywords.filter(function(n) {
                    return formData.indexOf(n) != -1;
                });
                var answerRelevancy = answerKeywordIntersection.length;

                if(answerRelevancy > 0){
                    relevantAnswers.push({
                        answer: answer,
                        relevancy: answerRelevancy
                    });
                }
            }

            return this.sortAnswers(relevantAnswers);
        }

        return false;
    },

    sortAnswers: function(answers){
        var sortedAnswers = answers.sort(function(a, b){
            return b.relevancy - a.relevancy;
        });

        return this.formatAnswers(sortedAnswers);
    },

    formatAnswers: function(answers){
        var formattedAnswers = [];

        // Because we already sorted the array we can simply remove the relevancy of the answer, and push the actual answers to a new array
        for(var answer_key in answers){
            if(answers.hasOwnProperty(answer_key)){
                formattedAnswers.push(answers[answer_key].answer);
            }
        }
        return formattedAnswers;
    }
});