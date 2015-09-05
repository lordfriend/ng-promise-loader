/**
 * Created by bob on 9/5/15.
 */
var gulp = require('gulp');
var sass = require('gulp-sass');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var uglifySaveLicense = require('uglify-save-license');
var template = require('gulp-template');

module.exports = function(options) {
  gulp.task('styles', ['clean'], function() {
    return gulp.src('src/ng-promise-loader.scss')
      .pipe(sass())
      .pipe(gulp.dest('dist/css'))
      .pipe(csso())
      .pipe(rename('ng-promise-loader.min.css'))
      .pipe(gulp.dest('dist/css'));
  });

  gulp.task('scripts',['clean'], function() {
    return gulp.src('src/ng-promise-loader.js')
      .pipe(ngAnnotate())
      .pipe(template({version: options.pkg.version}))
      .pipe(gulp.dest('dist/js'))
      .pipe(uglify({preserveComments: uglifySaveLicense}))
      .pipe(rename('ng-promise-loader.min.js'))
      .pipe(gulp.dest('dist/js'));
  });

  gulp.task('build', ['styles', 'scripts']);
};
