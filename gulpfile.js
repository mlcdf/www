const cp = require('child_process');
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const svgmin = require('gulp-svgmin');
const pngcrush = require('imagemin-pngcrush');
const size = require('gulp-size');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');

/**
 * Build the Hugo Site
 */
gulp.task('hugo', done => {
  return cp.spawn('hugo').on('close', done);
});

/**
 * Rebuild Hugo & do page reload
 */
gulp.task('hugo-watch', ['hugo'], () => {
  browserSync.reload();
});

gulp.task('minify-css', () => {
  gulp
    .src('./css/nkd.css') // set this to the file(s) you want to minify.
    .pipe(
      cssnano({
        discardComments: {
          removeAll: true
        }
      })
    )
    .pipe(size({ gzip: false, showFiles: true, title: 'minified css' }))
    .pipe(size({ gzip: true, showFiles: true, title: 'minified css' }))
    .pipe(rename('nkd.min.css'))
    .pipe(gulp.dest('./css/'));
});

// Task to optimize and minify svg
gulp.task('minify-svg', () => {
  gulp.src('./img/svg').pipe(svgmin()).pipe(gulp.dest('./img/svg'));
});

gulp.task('minify-img', () => {
  gulp
    .src('./img/*')
    .pipe(size({ gzip: false, showFiles: true, title: 'original image size' }))
    .pipe(size({ gzip: true, showFiles: true, title: 'original image size' }))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngcrush()]
      })
    )
    .pipe(size({ gzip: false, showFiles: true, title: 'minified images' }))
    .pipe(size({ gzip: true, showFiles: true, title: 'minified images' }))
    .pipe(gulp.dest('./img')); // change the dest if you don't want your images overwritten
});

// Task that compiles scss files down to good old css
gulp.task('sass', () => {
  gulp
    .src('./assets/styles/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      size({
        gzip: false,
        showFiles: true,
        title: 'without vendor prefixes'
      })
    )
    .pipe(
      size({
        gzip: true,
        showFiles: true,
        title: 'without vendor prefixes'
      })
    )
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(
      size({ gzip: false, showFiles: true, title: 'after vendor prefixes' })
    )
    .pipe(size({ gzip: true, showFiles: true, title: 'after vendor prefixes' }))
    .pipe(gulp.dest('./public/assets/styles'))
    .pipe(
      cssnano({
        discardComments: {
          removeAll: true
        }
      })
    )
    .pipe(size({ gzip: false, showFiles: true, title: 'minified css' }))
    .pipe(size({ gzip: true, showFiles: true, title: 'minified css' }))
    .pipe(rename('style.min.css'));
  browserSync.reload();
});

gulp.task('generate-service-worker', callback => {
  const path = require('path');
  const swPrecache = require('sw-precache');

  swPrecache.write(
    path.join('service-worker.js'),
    {
      staticFileGlobs: [
        '/',
        'index.html',
        'css/nkd.css',
        'about/',
        'about/index.html',
        'projects/',
        'projects/index.html',
        'scripts/app.js',
        'manifest.json',
        'favicon.ico',
        'assets/images/favicons/*.*'
      ],
      stripPrefix: ''
    },
    callback
  );
});

gulp.task('production', () => {
  gulp.run('minify-css', 'minify-img', 'minify-svg');
});

gulp.task('watch', () => {
  browserSync.init({
    server: {
      baseDir: 'public'
    }
  });
  // Watch .scss files
  gulp.watch('./assets/styles/*.scss', ['sass']);
  // Watch .html files and posts
  gulp.watch(['./content/**/*.md', './content/*.md'], ['hugo-watch']);
});

gulp.task('build', ['generate-service-worker', 'sass', 'hugo']);

gulp.task('serve', ['generate-service-worker', 'sass', 'watch', 'hugo']);
