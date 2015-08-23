/**
 * Created by bob on 8/20/15.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

module.exports = function() {
  gulp.task('serve', ['sass'], function() {
    browserSync.init({
      server: {
        baseDir: 'examples',
        routes: {
          '/bower_components': 'bower_components',
          '/src': 'src'
        }
      }
    });
  });
};
