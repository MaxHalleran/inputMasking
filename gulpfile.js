const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () =>
	gulp.src('date.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(gulp.dest('dist'))
);