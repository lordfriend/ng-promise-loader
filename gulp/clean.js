/**
 * Created by bob on 9/5/15.
 */
var gulp = require('gulp');
var del = require('del');

module.exports = function() {
  gulp.task('clean', function() {
    return del(['dist']);
  });
};
