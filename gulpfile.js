"use strict"

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync'),
      imagemin = require('gulp-imagemin'),
      imageResize = require('gulp-image-resize');

gulp.task('sync', function () {
    browserSync({
        server: {
            baseDir: './'
        },
        notify: false,
        open: true
    });
});

gulp.task('sass', function () {
    return gulp.src('src/css/scss/**/*.scss')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('./'))
        .pipe(browserSync.stream());
});

gulp.task('img-resize', function() {
    return gulp.src('src/img/slides/*')
        .pipe(imageResize({
            width : 320,
            height : 180,
            crop : false,
            upscale : true
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('img', function() {
    return gulp.src('src/img/*.jpg')
        .pipe(imagemin())
        .pipe(gulp.dest('dist'))
});


gulp.task('watch', function () {
    gulp.watch(['src/css/scss/**/*.scss'], gulp.parallel('sass'));
});


gulp.task('default',  gulp.parallel('watch', 'sync'));
