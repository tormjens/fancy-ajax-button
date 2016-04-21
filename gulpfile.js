var gulp       = require('gulp');
var sass       = require('gulp-sass');
var coffee     = require('gulp-coffee');
var concat     = require('gulp-concat');
var cssnano    = require('gulp-cssnano');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var gutil      = require('gulp-util');
var livereload = require('gulp-livereload');

gulp.task('sass', function() {
	return gulp.src('./src/scss/loader.scss')
	    .pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('./dist'))
	    .pipe(livereload());
});

gulp.task('styles-uglify', function() {
	return gulp.src('./dist/loader.css')
        .pipe(cssnano())
	    .pipe(rename({
	    	suffix: '.min'
	    }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', ['coffee'], function() {
	return gulp.src([
		// './node_modules/dragdealer/src/dragdealer.js',
		'./dist/loader.js'
	])
	.pipe(concat('loader.js'))
	.pipe(gulp.dest('./dist'))
    .pipe(livereload());
});

gulp.task('coffee', function() {
	return gulp.src('./src/js/loader.coffee')
	    .pipe(coffee({bare: true}).on('error', gutil.log))
	    .pipe(gulp.dest('./dist'));
});

gulp.task('scripts-uglify', function() {
	return gulp.src('dist/loader.js')
	    .pipe(uglify())
	    .pipe(rename({
	    	suffix: '.min'
	    }))
	    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', ['default'], function(){
	livereload.listen();
	gulp.watch('./src/js/**/*.coffee', ['scripts', 'scripts-uglify']);
	gulp.watch('./src/scss/**/*.scss', ['sass', 'styles-uglify']);
});

gulp.task('build', ['sass', 'scripts']);
gulp.task('uglify', ['scripts-uglify', 'styles-uglify']);
gulp.task('default', ['build', 'uglify']);
