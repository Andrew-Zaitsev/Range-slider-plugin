const path = require('path');
const webpackConfig = require('./webpack.config.js');

delete webpackConfig.entry;

module.exports = function (config) {
  config.set({
    client: {
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DISABLE, //config.LOG_INFO,

    autoWatch: true,

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    browsers: ["Chrome"],

    coverageReporter: { // coverage reporter не заработал
      dir: path.resolve(__dirname, 'coverage'), 
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'lcov', subdir: 'report-lcov' },
      ],
      instrumenterOptions: {
        istanbul: { noCompact: true },
      },
    },

    jasmineHtmlReporter: {
      suppressAll: true, // Suppress all messages (overrides other suppress settings)
      suppressFailed: true // Suppress failed messages
    },

    // list of files / patterns to load in the browser
    files: [
      path.resolve(__dirname, 'tests/tests.ts'),
    ],

    // list of files / patterns to exclude
    exclude: [],

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['webpack', 'jasmine-jquery', 'jasmine'],//  'jasmine-jquery'], // **

    // репортеры необходимы для  наглядного отображения результатов
    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['kjhtml','spec'], // ['spec', 'kjhtml'],  */   // ***

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor

    preprocessors: {
      //webpack transcodes into what the browser recognizes
      'tests/tests.ts': ['webpack'],// [path.resolve(__dirname, 'tests/tests.ts')]: ['webpack', 'sourcemap']
    },
  
    plugins: [
      'karma-webpack',
      'karma-jasmine',
      'karma-jasmine-jquery',
      'karma-chrome-launcher',
      'karma-spec-reporter',
      'karma-jasmine-html-reporter',
      // 'karma-coverage',
      // 'karma-coverage-istanbul-reporter' // ***
      // 'karma-sourcemap-loader',
    ],
  
    // передаем конфигурацию webpack
    webpack: webpackConfig,
  
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
