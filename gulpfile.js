var gulp = require('gulp');
var del = require('del');

/* jshint strict: false */

var clean = function clean () {
  return del(['dist']);
};

var copy = function copy () {
  return gulp
    .src('src/**/*')
    .pipe(gulp.dest('dist'));
};

exports.clean = clean;
exports.copy = copy;
exports.default = gulp.series(clean, copy);
