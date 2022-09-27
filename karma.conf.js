// process.env.CHROME_BIN = require('puppeteer').executablePath();

module.exports = function (config) {

    config.set({
        basePath: '',
        frameworks: ['mocha', 'browserify'],
        exclude: [],
        files: [{
            pattern: 'test/*.js',
            watched: false
        }],
        preprocessors: {
            'src/*.js'   : ['coverage'],
            'test/*-test.js': ['browserify']
        },
        browserify: {
            transform: [['babelify', { 'presets': ['@babel/preset-env'] }]]
        },
        plugins: [
            'karma-coverage',
            'karma-browserify',
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chrome-launcher'
        ],
        reporters: ['mocha', 'coverage'],
        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                {type: 'text-summary'},
                {type: 'json'},
                {type: 'html'}
            ]
        },
        webpackServer: {noInfo: true},
        port: 9876,
        colors: true,
        browserNoActivityTimeout: 60000,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['HeadlessChrome'],
        customLaunchers:{
            HeadlessChrome:{
                base: 'ChromeHeadless',
                flags: [
                    '--no-sandbox',
                    '--disable-web-security',
                    '--disable-gpu'
                ]
            }
        },
        singleRun: true
    });
};
