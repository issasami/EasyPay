var gulp = require('gulp');
var rimraf = require('rimraf');
var browsersync = require('browser-sync');
var	inline = require('gulp-inline-css');
var less = require('gulp-less');
var sequence = require('gulp-sequence');
var rename = require('gulp-rename');


gulp.task('html', function(){
	return gulp.src('src/index.html')
						.pipe(inline())
						.pipe(gulp.dest('dist'))
						.pipe(browsersync.reload({stream: true}))
} )

gulp.task('style', function(){
	return gulp.src('src/style-less.css')
						.pipe(less())
						.pipe(rename("style.css"))
						.pipe(gulp.dest('src'))
						.pipe(browsersync.reload({stream: true}))
} )

gulp.task('img', function() {
	return gulp.src('src/images/*.*')
	.pipe(gulp.dest('dist/images/'))
})


gulp.task('watch', function(cb) {
	sequence('style', 'html', 'img', cb);
	gulp.watch('src/**/*.*', ['watch']);
})

gulp.task('default', sequence('cleandist', 'watch', 'browser'));

gulp.task('browser', function() {
    browsersync.init({
        server: {
            baseDir: "dist"
        },
        notify: false
    });
});

gulp.task('cleandist', function(cb) {
	rimraf('./dist', cb);
})

