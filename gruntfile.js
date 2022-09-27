module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                compress: {
                    drop_console: true
                },
                preserveComments: false,
                sourceMap: true
            },
            default: {
                files: {
                    'build/wampy-cra.min.js': ['build/wampy-cra.js']
                }
            }
        },
        babel: {
            options: {
                sourceMap: true,
                presets: ['@babel/preset-env']
            },
            dist: {
                files: {
                    'build/wampy-cra.js': 'src/wampy-cra.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['babel', 'uglify']);
};
