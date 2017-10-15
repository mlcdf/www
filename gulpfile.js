const path = require('path');

const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const pngcrush = require('imagemin-pngcrush');
const rev = require('gulp-rev');
const sass = require('gulp-sass');
const size = require('gulp-size');
const svgmin = require('gulp-svgmin');
const swPrecache = require('sw-precache');
const uglify = require('gulp-uglify');

gulp.task('minify-css-js', () => {
  gulp
    .src(['./static/assets/styles/style.css', './static/assets/scripts/app.js']) // set this to the file(s) you want to minify.
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulpif('*.css', cssnano({ discardComments: { removeAll: true } })))
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

// Task to optimize and minify svg
gulp.task('minify-svg', () => {
  gulp
    .src('./assets/images/')
    .pipe(svgmin())
    .pipe(gulp.dest('./static/assets/images/'));
});

gulp.task('minify-png', () => {
  gulp
    .src('./assets/images/**/*.png')
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
    .pipe(gulp.dest('./static/assets/images/')); // change the dest if you don't want your images overwritten
});

gulp.task('image', () => {
  gulp.src('./assets/images/**').pipe(gulp.dest('./static/assets/images/')); // change the dest if you don't want your images overwritten
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
    .pipe(gulp.dest('./static/assets/styles/'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('es6', () => {
  gulp
    .src('./assets/scripts/app.js')
    .pipe(plumber())
    .pipe(babel())
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
    server: {
      baseDir: './'
    }
  });
  // Watch .scss files
  gulp.watch('./assets/styles/*.scss', ['sass']);
  // Watch .html files and posts
  gulp.watch(['./content/**/*.md', './content/*.md', './layouts/**/*.html']);
});

gulp.task('build', [
  'sass',
  'es6',
  'minify-png',
  'minify-svg',
  'minify-css-js'
]);

gulp.task('serve', ['sass', 'watch', 'image', 'es6']);
