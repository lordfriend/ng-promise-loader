/**
 * Created by bob on 9/4/15.
 */

var gulp = require('gulp'),
  karma = require('karma');

module.exports = function() {
  gulp.task('unit-test', function(done) {
    new karma.Server({
      configFile: __dirname + '/../karma.conf.js',
      singleRun: true
    }, done).start();
  });
};
