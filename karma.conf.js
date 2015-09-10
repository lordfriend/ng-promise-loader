/**
 * Created by bob on 9/4/15.
 */
module.exports = function(config) {
  var configuration = {
    autoWatch: false,
    frameworks: ['jasmine'],
    files: [
      {pattern: 'bower_components/angular/angular.js'},
      {pattern: 'bower_components/angular-mocks/angular-mocks.js'},
      {pattern: 'src/ng-promise-loader.js'},
      {pattern: 'test/*.spec.js'}
    ],
    browsers: ['PhantomJS'],
    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ]
  };
  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }
  config.set(configuration);
};
