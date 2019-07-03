"use strict"

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer'),
      browserSync = require('browser-sync'),
      imagemin = require('gulp-imagemin');

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

gulp.task('img', () =>
	gulp.src('src/img/*')
		.pipe(imagemin())
        .pipe(gulp.dest('images'))
);


gulp.task('watch', function () {
    gulp.watch(['src/css/scss/**/*.scss'], gulp.parallel('sass'));
});


gulp.task('default',  gulp.parallel('watch', 'sync'));
