const cp = require('child_process')
const browserSync = require('browser-sync')
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const svgmin = require('gulp-svgmin')
const pngcrush = require('imagemin-pngcrush')
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const gulpif = require('gulp-if')
const path = require('path')

// Task to optimize and minify svg
gulp.task('minify-svg', () => {
  gulp.src('./img/svg').pipe(svgmin()).pipe(gulp.dest('./img/svg'))
})

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
    .pipe(gulp.dest('./img')) // change the dest if you don't want your images overwritten
})

// Task that compiles scss files down to good old css
gulp.task('sass', () => {
  return gulp
    .src('./public/styles/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ['> 5%'],
        cascade: false
      })
    )
    .pipe(gulp.dest('./public/styles/'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('es6', () => {
  return gulp
    .src('./public/scripts/app.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/scripts/'))
    .pipe(browserSync.reload({ stream: true }))
})

gulp.task('generate-service-worker', function(callback) {
  const path = require('path')
  const swPrecache = require('sw-precache')
  console.log('sw')
  swPrecache.write(
    path.join('public/sw.js'),
    {
      stripPrefix: 'public',
      runtimeCaching: [
        {
          handler: 'cacheFirst',
          urlPattern: /^https:\/\/localhost/
        }
      ]
    },
    callback
  )
})

gulp.task(
  'production',
  ['sass', 'es6', 'generate-service-worker', 'minify-img', 'minify-svg'],
  () => {
    return gulp
      .src('public/**/*.{js, css}')
      .pipe(gulpif('**/bundle.js', uglify()))
      .pipe(
        gulpif(
          '**/style.css',
          cssnano({
            safe: true,
            autoprefixer: false,
            discardComments: { removeAll: true }
          })
        )
      )
      .pipe(gulp.dest('./public'))
  }
)

gulp.task('watch', () => {
  // Watch .js files
  gulp.watch('public/**/*.js', ['es6'])
  // Watch .scss files
  gulp.watch('public/**/*.scss', ['sass'])
})

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    proxy: 'https://localhost:3000',
    files: ['public/**/*.*'],
    browser: 'firefox',
    port: 7000
  })
})

gulp.task('default', ['generate-service-worker', 'browser-sync', 'watch'])
