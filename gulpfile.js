var gulp = require('gulp'),
    coffee = require('gulp-coffee'),
    del = require('del'),
    minifyCss = require('gulp-minify-css'),
    concat = require('gulp-concat');

var paths = {
  coffee:     ['./app/coffee/*.coffee'],
  scss:       ['./app/scss/*.scss', './app/scss/*.css'],
  vendorJS:   ['./app/vendor/js/*.js']
}

gulp.task('default', ['clean', 'sass', 'coffee']);

gulp.task('sass', function(done){
  gulp.src(paths.scss)
    // .pipe(sass({errLogToConsole: true}))
    .pipe(concat('app.css'))
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/css/'))
    .on('end', done);
});

gulp.task('coffee', function(done){
  gulp.src(paths.coffee)
    .pipe($.coffee({bare: true}))
    .on('error', function(err) {
      logError('coffee', err.filename + ':' + (err.location.first_line + 1) + ': ' + err.message);
    })
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./public/js/'))
    .on('end', done);
});

gulp.task('watch', function(){
  gulp.watch(paths.scss, ['sass']);
  gulp.watch(paths.coffee, ['coffee']);
});

gulp.task('clean', function(){
  del(['./public/javascripts/*', './public/stylesheets/*']);
});