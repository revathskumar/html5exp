'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var clean = require('gulp-clean');
var watch = require('gulp-watch');
var livereload = require('gulp-livereload');
var coffee = require('gulp-coffee');
var react = require('gulp-react');

gulp.task('build', ['clean-dist'], function(){
  return gulp.src(['app/scripts/main.js', 'app/scripts/inheritance.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('coffee', function(){
  return gulp.src('app/scripts/*.coffee')
    .pipe(coffee().on('error', console.log))
    .pipe(gulp.dest('.tmp/scripts/'));
});

gulp.task('clean-dist', function(){
  return gulp.src('dist/')
    .pipe(clean());
});

gulp.task('watch', function(){
  var server = livereload();

  gulp.watch([
    'app/scripts/*.js',
    '.tmp/scripts/*.js',
    'app/*.html',
    'app/styles/*.css'
  ]).on('change', function(file){
    console.log(file.path);
    server.changed(file.path);
  });

  gulp.watch('app/scripts/*.coffee', ['coffee']);
  gulp.watch('app/scripts/*.jsx', ['react']);
});

gulp.task('serve', ['watch'], function(){
  var connect = require('connect');
  var app = connect()
    .use(require('connect-livereload')({port: 35729}))
    .use(connect.static('app'))
    .use(connect.static('.tmp'))
    .use(connect.directory('app'));

  require('http').createServer(app)
    .listen(9000)
    .on('listening', function(){
      console.log('server up on http://localhost:9000/');
    });

});

gulp.task('react', function(){
  return gulp.src('app/scripts/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('.tmp/scripts/'));
});
