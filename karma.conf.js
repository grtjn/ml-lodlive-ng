/*global module*/
// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function(config) {
  'use strict';

  config.set({
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // Required libraries
      'node_modules/phantomjs-polyfill/bind-polyfill.js',
      'node_modules/jquery/dist/jquery.min.js',
      'bower_components/angular/angular.js',
      'bower_components/ml-lodlive/dist/ml-lodlive.complete.js',

      // templates
      'build/**/*.js',

      // App under test
      'src/ml-lodlive.js',
      'src/**/*.js',

      // Mocks
      'bower_components/angular-mocks/angular-mocks.js',

      // Tests
      'test/helpers.js',
      'test/spec/**/*.js',
    ],

    reporters: ['progress', 'coverage'],

    preprocessors: {
      'src/*.js': ['coverage']
    },

    coverageReporter: {
      reporters: [
        { type : 'text-summary' },
        { type : 'lcov', dir : 'coverage/' }
      ]
    },

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 15472,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false
  });
};
