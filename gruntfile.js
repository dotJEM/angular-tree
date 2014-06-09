/*global module:false*/
module.exports = function (grunt) {
    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        banner: grunt.file.read('banner'),
        clean: {
            src: ['build', 'temp']
        },

        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            core: {
                src: 'src/directives/dxTree.js',
                dest: 'build/<%= pkg.name %>.js'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            core: {
                src: '<%= concat.core.dest %>',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },

        watch: {
            dev: {
                files: [
                    'src/**/*.js'
                ],
                tasks: ['build']
            }
        },

        ngdocs: {
            options: {
                dest: 'temp',
                title: "dotJEM Angular Tree",
                html5Mode: false
            },
            all: ['src/**/*.js']
        }
    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('default', ['clean', 'build']);
    grunt.registerTask('develop', ['clean', 'build', 'connect', 'watch']);
    grunt.registerTask('build', ['concat', 'uglify']);
};