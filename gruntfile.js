module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            dist: ['dist/*']
        },
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
                    'dist/wampy-cra-node.min.js': ['dist/wampy-cra-node.js'],
                    'dist/wampy-cra-browser.min.js': ['dist/wampy-cra-browser.js'],
                    'dist/wampy-cra.min.js': ['dist/wampy-cra.js']
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
                    'dist/wampy-cra-node.js': 'src/nodeEntry.js',
                    'dist/wampy-cra-browser.js': 'src/browserEntry.js',
                    'dist/wampy-cra.js': 'src/wampy-cra.js'
                }
            }
        }
    });

    grunt.registerTask('default', ['clean', 'babel', 'uglify']);
};
