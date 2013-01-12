/*global module:false*/

module.exports = function(grunt) {
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Project configuration.
	grunt.initConfig({
		lint: {
			all: ['grunt.js', 'dev/**/*.js']
		},
		concat: {
			dist: {
				// 結合元となるファイル
				src: [
					'dev/src/KlGroup.js',
					'dev/src/KlObjectPool.js'
				],
				// 結合先のファイル名
				dest: 'kivalib.enchant.js'
			}
		},
		min: {
			dist: {
				// 結合元となるファイル
				src: [
					'dev/src/KlGroup.js',
					'dev/src/KlObjectPool.js'
				],
				// 結合先のファイル名
				dest: 'kivalib.enchant.min.js'
			}
		}
	});

	grunt.registerTask('default', 'concat min');
}
;
