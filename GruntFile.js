﻿// Generated on 2014-01-08 using generator-angular 0.7.1
'use strict';

module.exports = function (grunt) {
    var config = {
        pkg: grunt.file.readJSON('package.json'),
        typescript: {
            base: {
                src: [
                    'Scripts/typings/angularjs/angular.d.ts',
                    'Scripts/typings/jquery/jquery.d.ts',
                    'src/interfaces.ts',
                    'src/enums.ts',
                    'src/init.ts',
                    'src/models/qGridModel.ts',
                    'src/directives/ngEnter.ts',
                    'src/directives/qGrid.ts',
                    'src/controllers/qGridController.ts',
               

                ],
                dest: 'dist/qgrid.js',
                options: {
                    module: 'amd',
                    sourcemap: true,
                    declaration: true,
                    target: 'es5'
                }
            }
        },
        uglify: {
            dist: {
                files: {
                    'dist/qgrid.min.js': [
                        'dist/<%= pkg.name %>.js'
                    ]
                }
            }
        },
        watch: {
            scripts: {
                files: ['**/*.ts'],
                tasks: [
                    'typescript'
                ],
                options: {
                    spawn: false,
                },
            },
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                      'dist'
                    ]
                }]
            },
            server: '.tmp'
        },
        concat: {
            dist: {
                src: ['dist/qgrid.js', 'dist/templates.js', 'dist/nggridtemplates.js'],
                dest: 'dist/qgrid.js',
            }
        },
        ngtemplates: {
            qgrid: {
                //cwd: '<%= yeoman.app %>',
                src: ['src/templates/qgrid/*.html'],
                dest: 'dist/templates.js',
                options: {

                    module: 'qGrid',
                }
            },
            nggrid: {
                //cwd: '<%= yeoman.app %>',
                src: ['src/templates/nggrid/*.html'],
                dest: 'dist/nggridtemplates.js',
                options : {
            
                        module: 'ngGrid',
                }
            },
            options: {
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    removeComments: true, // Only if you don't use comment directives!
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                }

            },


        },
        cssmin: {
            minify: {
                expand: true,
                cwd: 'styles/',
                src: ['*.css', '!*.min.css'],
                dest: 'dist',
                ext: '.min.css'
            }
        }


    };

    grunt.initConfig(config);
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    // Default task(s).
    grunt.registerTask('default', ['clean:dist', 'typescript', 'ngtemplates:qgrid', 'ngtemplates:nggrid', 'concat', 'uglify', 'cssmin:minify']);





}