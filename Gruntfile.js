/*global module:false*/

module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		lint: {
			all: ['grunt.js', 'dev/**/*.js']
		},
		concat: {
			dist: {
				src: '<%= pkg.sourceFiles %>',
				dest: '<%= pkg.name %>.js'
			}
		},
		uglify: {
			release: {
				files: {
					'<%= pkg.uglified %>': '<%= pkg.sourceFiles %>'
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['concat', 'uglify']);
}
;
