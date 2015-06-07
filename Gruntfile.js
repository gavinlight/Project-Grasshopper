module.exports = function(grunt){

	grunt.initConfig({

        watch: {
            emberTemplates: {
                options: {
                    livereload: true
                },
                files: 'public/app/templates/**/*.hbs',
                tasks: ['emberTemplates']
            }
        },

		emberTemplates: {
			compile: {
                options: {
                    templateCompilerPath: 'public/vendor/ember/ember-template-compiler.js',
                    handlebarsPath: 'public/vendor/handlebars/handlebars.js',
                    templateName: function(name) {
                        var templatesPath = 'public/app/templates/';

                        if(name.indexOf('partials') > -1){
                            return name.replace(templatesPath + 'partials/', '');
                        } else {
                            return name.replace(templatesPath, '');
                        }
                    },
                    preprocess: function(source) {
                        return source.replace(/\s+/g, ' ');
                    }
                },
				files: {
					"public/app/templates/compiled_template.js": "public/app/templates/**/*.hbs"
				}
			}
		}

	});

    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ember-templates');

};