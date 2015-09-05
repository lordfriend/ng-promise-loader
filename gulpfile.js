/**
 * Created by bob on 8/23/15.
 */
var gulp = require('gulp');
var wrench = require('wrench');
var fs = require('fs');

var pkg = JSON.parse(fs.readFileSync('./package.json'));

var options = {
  pkg: pkg
};

wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js|coffee)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file)(options);
});
