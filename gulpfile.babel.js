
'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

import postcssImport from 'postcss-import';
import postcssCssnext from 'postcss-cssnext';
import postcssExtend from 'postcss-extend';
import postcssReporter from 'postcss-reporter';
import cssnano from 'cssnano';

import metalsmith from './metalsmith.babel.js';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


// Handle the CSS process
gulp.task('style', () => {
  return gulp.src("app/assets/css/app.css")
    .pipe($.plumber())
		.pipe($.sourcemaps.init())
    .pipe($.postcss([
      postcssImport(),
			postcssCssnext(),
			postcssExtend(),
			cssnano(),
      postcssReporter(),
    ]))
		.pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(reload({stream: true}));
});

// Handle the Metalsmith process
gulp.task('metalsmith', () => {
  metalsmith();
});

// Transpile ES6 to ES5
gulp.task('script', () => {
  // return gulp.src('assets/js/app.js')
  //   .pipe($.plumber())
  //   .pipe($.sourcemaps.init())
  //   .pipe($.babel())
  //   .pipe($.sourcemaps.write('.'))
  //   .pipe(gulp.dest('./dist/js'))
  //   .pipe(reload({stream: true}));
});

// Images
gulp.task('img', () => {
	return gulp.src([
		'app/assets/img/*.*',
	], {
    dot: true
	}).pipe(gulp.dest('tmp/img'));
});


 // Copy extra files to /dist
 gulp.task('copy extras', () => {
 	return gulp.src([
     'app/CNAME',
     'app/favicon.ico',
     'app/humans.txt',
     'app/robots.txt',
     'app/manifest.json'
   ], {
     dot: true
   }).pipe(gulp.dest('./dist'));
 });

// Initialize a Browsersync server
gulp.task('serve', () => {
  browserSync.init({
		port: 3000,
		open: 'external',
    server: {
      baseDir: ['./dist', 'tmp', 'app']
    }
  });
});

// Watch files and trigger reload
gulp.task('watch', () => {

	gulp.watch([
		'app/contents/**/*',
		'app/templates/**/*'
	], ['metalsmith', 'style', 'script']);

	gulp.watch('app/assets/img/**/*', ['img']);
	gulp.watch('app/assets/css/**/*', ['style']);
	gulp.watch('app/assets/js/**/*', ['script']);
	gulp.watch("dist/*.html").on('change', reload);
});

gulp.task('clean', () => {
	return del('./dist');
});

gulp.task('deploy', () => {
  return gulp.src('./dist/**/*')
    .pipe($.ghPages());
});

gulp.task('build', ['metalsmith', 'script', 'style', 'copy extras'], () => {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean', 'serve', 'watch', 'metalsmith', 'script', 'style', 'img']);

