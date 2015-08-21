/**
 * Created by bob on 8/20/15.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', function() {
  browserSync.init({
    server: './examples'
  });

  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/*.html").on('change', browserSync.reload);
});
