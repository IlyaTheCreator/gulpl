const { src, dest, watch, series } = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const cssnano = require("cssnano");
const terser = require("gulp-terser");
const browserSync = require("browser-sync").create();

// Sass Task
function scssTask() {
  return src("app/scss/**/*.scss", { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([cssnano]))
    .pipe(dest("dist/css", { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
  return src("app/js/**/*.js", { sourcemaps: true })
    .pipe(terser())
    .pipe(dest("dist/js", { sourcemaps: "." }));
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
