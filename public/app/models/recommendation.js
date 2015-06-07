App.Recommendation = DS.Model.extend({

    adapter: DS.FixtureAdapter.extend({
        queryFixtures: function(fixtures, query, type) {

            return fixtures.filter(function(item) {
                for(prop in query) {
                    if( item[prop] != query[prop]) {
                        return false;
                    }
                }

                return true;
            });

        }
    }),

    text: DS.attr('string'),
    type: DS.attr('string'),
    recommendations: DS.attr('string'),

    recommendationsArray: function(){
        return this.get('recommendations').split(', ');
    }.property('recommendations'),

    recommendationText: function(){
        var text = this.get('text');

        return text.charAt(0).toUpperCase() + text.slice(1);
    }.property('text')
});

App.Recommendation.reopenClass({
    FIXTURES: [
        {id: 1, type: 'level', recommendations: ['havo 5', 'havo'], text: 'havo 5'},
        {id: 2, type: 'level', recommendations: ['vwo 6', 'vwo'], text: 'vwo 6'},
        {id: 3, type: 'subject', recommendations: ['examenloket', 'loket'], text: 'het examenloket'},
        {id: 4, type: 'subject', recommendations: ['examenpakketten', 'pakketten'], text: 'de examenpakketten'},
        {id: 5, type: 'subject', recommendations: ['examenfraude', 'fraude'], text: 'examenfraude'},
        {id: 6, type: 'class', recommendations: ['nederlands'], text: 'nederlands'},
        {id: 7, type: 'class', recommendations: ['frans'], text: 'frans'},
        {id: 8, type: 'class', recommendations: ['engels'], text: 'engels'},
        {id: 9, type: 'class', recommendations: ['wiskunde a', 'wiskunde'], text: 'wiskunde a'},
        {id: 10, type: 'class', recommendations: ['economie'], text: 'economie'},
        {id: 11, type: 'class', recommendations: ['geschiedenis'], text: 'geschiedenis'},
        {id: 12, type: 'class', recommendations: ['aardrijkskunde'], text: 'aardrijkskunde'},
        {id: 13, type: 'exam', recommendations: ['landelijk', 'landelijke', 'examen', 'examens'], text: 'landelijke'},
        {id: 14, type: 'exam', recommendations: ['school', 'examen', 'examens'], text: 'school'},
    ]
});