const gulp = require("gulp"),
  plumber = require("gulp-plumber"),
  babel = require("gulp-babel"),
  uglify = require("gulp-uglify"),
  rename = require("gulp-rename");

gulp.task("build", function() {
  return gulp
    .src("src/H2A_drama.js")
    .pipe(plumber())
    .pipe(
      rename({
        extname: ".safe.js"
      })
    )
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(gulp.dest("out/"))
    .pipe(
      rename({
        extname: ".safe.min.js"
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("out/"));
});

gulp.task("default", ["build"]);
