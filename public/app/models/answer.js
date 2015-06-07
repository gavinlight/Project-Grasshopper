App.Answer = DS.Model.extend({

    title: DS.attr('string'),
    content: DS.attr('string'),
    source: DS.attr('string'),
    keywords: DS.attr('string'),

    slug: function(){
        return this.get('title').replace(/[\.,-\/#?!$%\^&\*;:{}=\-_`~()]/g, '').replace(/\s+/g, '-').toLowerCase();
    }.property('title'),

    sourceOrigin: function(){
        var sourceArray = this.get('source').split('/');
        return sourceArray[0] + '//' + sourceArray[2];
    }.property('source'),

    keywordsArray: function(){
        return this.get('keywords').split(', ');
    }.property('keywords'),

    contentSummary: function(){
        var content = this.get('content');

        if(jQuery(content).text().length > 200){
            var truncatedContent = this.truncate(content, 0, 200);
            return truncatedContent + '...';
        } else {
            return content;
        }
    }.property('content'),

    titleSummary: function(){
        var title = this.get('title');

        if(title.length > 30){
            var truncatedTitle = this.truncate(title, 0, 30);
            return truncatedTitle + '...';
        } else {
            return title;
        }
    }.property('title'),

    truncate: function(str, start, length){
        var countTags = 0;
        var returnString = "";
        var writeLetters = 0;
        while (!((writeLetters >= length) && (countTags == 0))) {
            var letter = str.charAt(start + writeLetters);
            if (letter == "<") {
                countTags++;
            }
            if (letter == ">") {
                countTags--;
            }
            returnString += letter;
            writeLetters++;
        }
        return returnString;
    }
});

App.Answer.reopenClass({
    findRelevantAnswers: function(formData){

        var relevantAnswers = [];
        var that = this;

        return this.store.findAll('answer').then(function(answers){

            answers.forEach(function(answer){
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
            });

            if(relevantAnswers.length > 0){
                return that.sortAnswers(relevantAnswers);
            } else {

                return false;
            }

        });

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