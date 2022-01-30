"use strict";

// gulpパッケージインストール
const gulp = require('gulp');
const pug = require('gulp-pug');
// const sass = require('gulp-sass')(require('sass'));//LibSass
const sass = require('gulp-dart-sass');//DartSass
const autoprefixer =require('gulp-autoprefixer');
const cssmin = require('gulp-cssmin');
const uglify = require('gulp-uglify');
const browsersync = require('browser-sync');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const del = require('del');

const paths = {
  src: 'src',
  dist: 'dist'
};


// Pug
gulp.task('html', function() {
  return gulp.src([
    paths.src + '/pug/**/*.pug',
    '!' + paths.src + '/pug/**/_*.pug'
  ])
  .pipe(plumber({ //エラーを検知しデスクトップ通知
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(pug({pretty: true})) // 読みやすいコードに整形
  .pipe(gulp.dest(paths.dist))
});

// Sass
gulp.task('css', function() {
  return gulp.src([
    paths.src + '/sass/**/*.scss',
    '!' + paths.src + '/sass/**/_*.scss'
  ])
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sass({
    outputStyle: 'expanded' //expanded, nested, campact, compressedから選択
  }))
  .pipe(autoprefixer({
    overrideBrowserslist: 'last 2 versions'
  }))
  .pipe(gulp.dest(paths.dist + '/css'))
});

// JavaScript
gulp.task('js', function() {
  return gulp.src(
    paths.src + '/js/**/*'
  )
  // .pipe(uglify())
  .pipe(gulp.dest(paths.dist + '/js'))
});

// Image File
gulp.task('image', function() {
  return gulp.src(
    paths.src + '/images/**/*'
  )
  .pipe(gulp.dest(paths.dist + '/images'))
});

// Browser Sync
gulp.task('browser-sync', function(done) {
  browsersync({
    server: {
      baseDir: paths.dist
    }
  });
  done();
});

// Watch
gulp.task('watch', function() {
  const reload = () => {
    browsersync.reload();
  };
  gulp.watch(paths.src + '/sass/**/*').on('change', gulp.series('css', reload));
  gulp.watch(paths.src + '/pug/**/*').on('change', gulp.series('html', reload));
  gulp.watch(paths.src + '/js/**/*').on('change', gulp.series('js', reload));
  gulp.watch(paths.src + '/images/**/*').on('change', gulp.series('image', reload));
});

// Clean
gulp.task('clean', function(done) {
  del.sync(paths.dist + '/**', '!' + paths.dist);
  done();
});

// default
gulp.task('default',
  gulp.series(
    'clean',
    gulp.parallel(
      'html',
      'css',
      'js',
      'image',
      'watch',
      'browser-sync'
    )
  )
);