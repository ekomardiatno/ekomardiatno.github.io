var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  clean = require('gulp-clean-css'),
  include = require('gulp-file-include'),
  uglify = require('gulp-uglify'),
  rename = require('gulp-rename'),
  saveLicense = require('uglify-save-license'),
  sourceMaps = require('gulp-sourcemaps'),
  concat = require('gulp-concat'),
  config = {
    bower: 'bower_components'
  }

sass.compiler = require('node-sass')

// Build HTML
function html() {

  return gulp.src('./src/pages/*.html')
    .pipe(include())
    .pipe(gulp.dest('./'))
    .pipe(connect.reload())

}

// Compile CSS
function styles() {

  return gulp.src([
    './src/scss/*.scss'
  ])
    .pipe(sourceMaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(clean())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./css'))
    .pipe(connect.reload())

}

// Combine JS
function scripts() {

  return gulp.src([
    './src/js/*.js',
    './src/js/*/*.js'
  ])
    .pipe(sourceMaps.init())
    .pipe(concat('scripts.js'))
    .pipe(uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourceMaps.write('./'))
    .pipe(gulp.dest('./js'))
    .pipe(connect.reload())

}

// Export CSS Libs
function libs(done) {

  gulp.src([
    config.bower + '/bootstrap/dist/css/bootstrap.min.css',
    config.bower + '/bootstrap/dist/css/bootstrap.min.css.map'
  ])
    .pipe(gulp.dest('./css'))

  gulp.src([
    config.bower + '/jquery/dist/jquery.min.js',
    config.bower + '/jquery/dist/jquery.min.map',
    config.bower + '/bootstrap/dist/js/bootstrap.bundle.min.js',
    config.bower + '/bootstrap/dist/js/bootstrap.bundle.min.js.map',
  ])
    .pipe(gulp.dest('./js'))

  done()

}

// Watch
function watch(done) {

  gulp.watch([
    './src/pages/*.html',
    './src/include/*.html'
  ], html)

  gulp.watch([
    './src/scss/*.scss',
    './src/scss/*/*.scss',
    './src/scss/*/*/*.scss'
  ], styles)

  gulp.watch('./src/js/*.js', scripts)

  done()

}

// Start server
function server(done) {

  connect.server({
    root: './',
    livereload: {
      port: 35721
    },
    host: [
      'localhost',
      '192.168.93.25'
    ],
    port: 7777
  })

  done()

}

gulp.task('import', gulp.series(libs))
gulp.task('default', gulp.series(server, watch, html, styles, scripts, libs))
gulp.task('build', gulp.series(server, watch, html, styles, scripts))