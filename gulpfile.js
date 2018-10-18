const gulp = require('gulp'),
  plumber = require('gulp-plumber'),
  babel = require('gulp-babel'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  jsfuck = require('gulp-jsfuck'),
  beautify = require("gulp-beautify");

gulp.task('build', function (cb) {
  return gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(rename({ extname: '.safe.js' }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(beautify({ indent_size: 2 }))
    .pipe(gulp.dest('out/'))
    .pipe(rename({
      extname: '.min.js'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('out/'))
});

gulp.task('fuck-es6', function () {
  return gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(rename({ extname: '.fuck.js' }))
    .pipe(jsfuck())
    .pipe(gulp.dest('out/'))
});
gulp.task('fuck-you', function () {
  return gulp.src('src/**/*.js')
    .pipe(plumber())
    .pipe(rename({ extname: '.fuck.you.js' }))
    .pipe(babel({ presets: ['@babel/env'] }))
    .pipe(jsfuck())
    .pipe(gulp.dest('out/'))
});

gulp.task('default', ['build']);

gulp.task('fuck', ['fuck-es6', 'fuck-you']);
