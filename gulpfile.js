var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var csslint = require('gulp-csslint');
var del = require('del');
var gulp = require('gulp');
var htmlReplace = require('gulp-html-replace');
var jshint = require('gulp-jshint');
var jshintStylish = require('jshint-stylish');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

/* jshint strict: false */

var clean = function clean () {
  return del(['dist']);
};

var copy = function copy () {
  return gulp
    .src('src/**/*')
    .pipe(gulp.dest('dist'));
};

var html = function html () {
  return gulp
    .src('src/index.html')
    .pipe(htmlReplace({
      css: 'style.css',
      js: 'bundle.js'
    }))
    .pipe(gulp.dest('dist'));
};

var scripts = function scripts () {
  return gulp
    .src(['node_modules/angular/angular.js', 'src/js/app.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist'));
};

var serve = function serve () {
  browserSync.init({
    port: 3000,
    server: {
      baseDir: './src',
      routes: {
        '/vendor': 'node_modules'
      }
    }
  });

  gulp.watch('src/**/*').on('change', browserSync.reload);

  gulp.watch('src/css/**/*.css').on('change', function cssLinter (path) {
    gulp
      .src(path)
      .pipe(csslint())
      .pipe(csslint.formatter());
  });

  gulp.watch('src/js/**/*.js').on('change', function jsLinter (path) {
    gulp
      .src(path)
      .pipe(jshint())
      .pipe(jshint.reporter(jshintStylish));
  });
};

var styles = function styles () {
  return gulp
    .src(['node_modules/bootstrap/dist/css/bootstrap.css', 'src/css/main.css'])
    .pipe(autoprefixer())
    .pipe(concat('style.css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist'));
};

var build = gulp.series(clean, gulp.parallel(html, scripts, styles));

exports.build = build;
exports.clean = clean;
exports.copy = copy;
exports.html = html;
exports.scripts = scripts;
exports.serve = serve;
exports.styles = styles;

exports.default = build;
