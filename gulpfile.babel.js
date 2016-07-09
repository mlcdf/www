
'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';

import postcssImport from 'postcss-import';
import postcssCssnext from 'postcss-cssnext';
import postcssReporter from 'postcss-reporter';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

// Handle HTML process
gulp.task('html', ['styles', 'scripts'], () => {
  return gulp.src('app/*.html')
  .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
  .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
  .pipe($.if('*.html', $.htmlMinifier({collapseWhitespace: true})))
  .pipe(gulp.dest('dist'));
});

// Handle the CSS process
gulp.task('styles', () => {
  return gulp.src("app/css/app.css")
    .pipe($.plumber())
    .pipe($.postcss([
      postcssImport(),
			postcssCssnext(),
      postcssReporter()
    ]))
    .pipe($.uncss({
      html: ['app/**/*.html'], ignore: ['svg', ':hover', ':visited', ':link', ':visited']
     }))
		.pipe($.csslint())
    .pipe($.csslint.reporter())
    .pipe(gulp.dest('.tmp/css'))
    .pipe(reload({stream: true}));
});

// Transpile ES6 to ES5
gulp.task('scripts', () => {
  return gulp.src('assets/js/app.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('.tmp/js'))
    .pipe(reload({stream: true}));
});

// Images
gulp.task('images', () => {
	return gulp.src('app/img/**/*')
    .pipe($.cache($.imagemin()))
    .pipe(gulp.dest('dist/img'));
});

 // Copy extra files to /dist
 gulp.task('extras', () => {
   return gulp.src([
    'app/**/*.*',
    '!app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest('dist'));
 });

// Initialize a Browsersync server
gulp.task('serve', () => {
  browserSync.init({
		port: 3000,
		open: 'external',
    server: {
      baseDir: ['.tmp', 'app']
    },
		notify: false
  });
});

// Watch files and trigger reload
gulp.task('watch', () => {
	gulp.watch('app/img/**/*', ['images']);
	gulp.watch('app/css/**/*.css', ['styles']);
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch("app/**/*.html", ['styles']).on('change', reload);
});

gulp.task('clean', () => {
	return del('dist');
});

gulp.task('build', ['html', 'images', 'extras'], () => {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean', 'scripts', 'styles', 'serve', 'watch', 'images']);
