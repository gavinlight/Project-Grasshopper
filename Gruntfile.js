module.exports = function(grunt){

	grunt.initConfig({

        watch: {
            emberTemplates: {
                options: {
                    livereload: true
                },
                files: 'public/app/views/**/*.hbs',
                tasks: ['emberTemplates']
            }
        },

		emberTemplates: {
			compile: {
                options: {
                    templateCompilerPath: 'public/vendor/ember/ember-template-compiler.js',
                    handlebarsPath: 'public/vendor/handlebars/handlebars.js',
                    templateName: function(name) {
                        var routePath = 'public/app/views/';

                        if(name.indexOf('partials') > -1){
                            return name.replace(routePath + 'partials/', '');
                        } else {
                            return name.replace(routePath, '');
                        }
                    },
                    preprocess: function(source) {
                        return source.replace(/\s+/g, ' ');
                    }
                },
				files: {
					"public/app/views/compiled_view.js": "public/app/views/**/*.hbs"
				}
			}
		}

	});

    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-ember-templates');

};