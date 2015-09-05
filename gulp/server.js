/**
 * Created by bob on 8/20/15.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');

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

    gulp.watch(['examples/*.scss', 'src/*.scss'], ['sass']);
    gulp.watch(['examples/*.html', 'examples/*.js', 'src/*.js'])
      .on('change', browserSync.reload);
  });
};
