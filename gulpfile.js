const path = require('path');

const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const plumber = require('gulp-plumber');
const rev = require('gulp-rev');
const sass = require('gulp-sass');
const swPrecache = require('sw-precache');
const uglify = require('gulp-uglify');

gulp.task('minify', () => {
  gulp
    .src(['./static/assets/styles/style.css', './static/assets/scripts/app.js']) // set this to the file(s) you want to minify.
    .pipe(gulpif('*.js', rev()))
    .pipe(gulpif('*.css', rev()))
    .pipe(gulpif('*.js', gulp.dest('./static/assets/scripts/')))
    .pipe(gulpif('*.css', gulp.dest('./static/assets/styles/')))
    .pipe(
      rev.manifest({
        path: 'rev.json',
        merge: true // merge with the existing manifest if one exists
      })
    )
    .pipe(gulp.dest('./static/assets/'));
});

// Task that compiles scss files down to good old css
gulp.task('sass', () => {
  gulp
    .src('./assets/styles/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['> 5%'],
        cascade: false
      })
    )
    .pipe(cssnano({ discardComments: { removeAll: true } }))
    .pipe(gulp.dest('./static/assets/styles/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('scripts', () => {
  gulp
    .src('./assets/scripts/app.js')
    .pipe(plumber())
    .pipe(uglify())
    .pipe(gulp.dest('./static/assets/scripts/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('generate-service-worker', callback => {
  swPrecache.write(
    path.join('static/sw.js'),
    {
      staticFileGlobs: [
        'static/assets/styles/**.css',
        'static/assets/images/**.*',
        'static/assets/scripts/**.js',
        'static/manifest.json'
      ],
      runtimeCaching: [
        {
          handler: 'cacheFirst',
          urlPattern: /^https:\/\/localhost/
        }
      ]
    },
    callback
  );
});

gulp.task('watch', () => {
  browserSync.init({
    port: 5000,
    proxy: 'localhost:3000'
  });
  gulp.watch('./assets/styles/*.scss', ['sass']);
});

gulp.task('build', ['sass', 'scripts', 'minify']);

gulp.task('serve', ['sass', 'scripts', 'watch']);
