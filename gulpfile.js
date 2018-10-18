const gulp = require("gulp");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel"),
  babel_opt = { presets: ["@babel/env"] };
const uglify = require("gulp-uglify"),
  uglify_opt = { output: { comments: /^:/ } },
  uglify_opt_books = {};
const rename = require("gulp-rename"),
  rename_opt_min = { extname: ".min.js" },
  rename_opt_safe = { extname: ".safe.js" };
const beautify = require("gulp-beautify"),
  beautify_opt = { indent_size: 2 };
const concat = require("gulp-concat");

const path = {
  src: {
    all: "src/**/*.js",
    plugin: "src/*.js",
    books: "src/books/**/*.js"
  },
  out: {
    all: "out/",
    books: "out/books/"
  },
  name: {
    shelf: "book-shelf.js"
  }
};

gulp.task("build", function () {
  return gulp
    .src(path.src.plugin)
    .pipe(plumber())
    .pipe(rename(rename_opt_safe))
    .pipe(babel(babel_opt))
    .pipe(beautify(beautify_opt))
    .pipe(gulp.dest(path.out.all))
    .pipe(rename(rename_opt_min))
    .pipe(uglify(uglify_opt))
    .pipe(gulp.dest(path.out.all));
});

gulp.task("build-all", function () {
  return gulp
    .src(path.src.all)
    .pipe(plumber())
    .pipe(rename(rename_opt_safe))
    .pipe(babel(babel_opt))
    .pipe(beautify(beautify_opt))
    .pipe(gulp.dest(path.out.all))
    .pipe(rename(rename_opt_min))
    .pipe(uglify(uglify_opt))
    .pipe(gulp.dest(path.out.all));
});

gulp.task("archive", function () {
  return gulp
    .src(path.src.books)
    .pipe(plumber())
    .pipe(concat(path.name.shelf))
    // .pipe(gulp.dest(path.out.books))
    // .pipe(rename(rename_opt_safe))
    .pipe(babel(babel_opt))
    // .pipe(beautify(beautify_opt))
    // .pipe(gulp.dest(path.out.books))
    // .pipe(rename(rename_opt_min))
    .pipe(uglify(uglify_opt_books))
    .pipe(gulp.dest(path.out.books));
});

gulp.task("default", ["build-all", "archive"]);
