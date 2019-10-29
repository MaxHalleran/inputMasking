const gulp = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

gulp.task('js', () =>
	gulp.src('kd-input-masking.js')
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('../willow-dev/assets'))
);

gulp.task('sampleJs', () =>
		gulp.src('main.js')
			.pipe(babel({
				presets: ['@babel/env']
			}))
			.pipe(gulp.dest('dist/sample'))
);

gulp.task('watch:js', function () {
	gulp.watch('kd-input-masking.js', gulp.series('js'));
});