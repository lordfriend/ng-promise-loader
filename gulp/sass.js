/**
 * Created by bob on 8/23/15.
 */
'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

module.exports = function() {
  gulp.task('sass', function() {
    return gulp.src(['examples/*.scss'])
      .pipe(sass())
      .pipe(gulp.dest("examples"))
      .pipe(browserSync.stream());
  });
};
