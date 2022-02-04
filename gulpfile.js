const { src, dest, watch, series } = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();
const webpack = require("webpack-stream");

// Sass Task
function scssTask() {
  return src("app/scss/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano]))
    .pipe(dest("dist/css", { sourcemaps: "." }))
    .pipe(browserSync.stream());
}

// JavaScript Task
function jsTask() {
  return src("app/js/**/*.js", { sourcemaps: true })
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(webpack({
      mode: "development",
    }))
    .pipe(terser())
    .pipe(dest("dist/js"));
}

// Browsersync Tasks
function browserSyncServe(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browserSyncReload(cb) {
  browserSync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["app/scss/**/*.scss", "app/js/**/*.js"],
    series(scssTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(scssTask, jsTask, browserSyncServe, watchTask);
