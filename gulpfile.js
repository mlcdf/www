const path = require('path')

const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')
const browserSync = require('browser-sync')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const gulp = require('gulp')
const gulpif = require('gulp-if')
const imagemin = require('gulp-imagemin')
const nodemon = require('gulp-nodemon')
const plumber = require('gulp-plumber')
const pngcrush = require('imagemin-pngcrush')
const sass = require('gulp-sass')
const size = require('gulp-size')
const svgmin = require('gulp-svgmin')
const swPrecache = require('sw-precache')
const uglify = require('gulp-uglify')

// Task to optimize and minify svg
gulp.task('minify-svg', () => {
  gulp.src('./img/svg').pipe(svgmin()).pipe(gulp.dest('./img/svg'))
})

gulp.task('minify-img', () => {
  gulp
    .src('./public/images/*')
    .pipe(size({gzip: false, showFiles: true, title: 'original image size'}))
    .pipe(size({gzip: true, showFiles: true, title: 'original image size'}))
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
        use: [pngcrush()]
      })
    )
    .pipe(size({gzip: false, showFiles: true, title: 'minified images'}))
    .pipe(size({gzip: true, showFiles: true, title: 'minified images'}))
    .pipe(gulp.dest('./public/images/')) // Change the dest if you don't want your images overwritten
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
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('es6', () => {
  return gulp
    .src('./public/scripts/app.js')
    .pipe(plumber())
    .pipe(babel())
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./public/scripts/'))
    .pipe(browserSync.reload({stream: true}))
})

gulp.task('generate-service-worker', callback => {
  swPrecache.write(
    path.join('public/sw.js'),
    {
      dynamicUrlToDependencies: {
        '/offline': ['views/templates/layout.njk', 'views/offline.njk']
      },
      staticFileGlobs: [
        'public/styles/**.css',
        'public/images/**.*',
        'public/scripts/**.js',
        'public/manifest.json'
      ],
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

gulp.task('watch', () => {
  // Watch .js files
  gulp.watch('public/**/*.js', ['es6', 'generate-service-worker'])
  // Watch .scss files
  gulp.watch('public/**/*.scss', ['sass', 'generate-service-worker'])
})

gulp.task('browser-sync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: 'http://localhost:3000',
    files: ['public/**/*.*'],
    browser: 'firefox',
    port: 7000
  })
})

gulp.task('nodemon', cb => {
  let started = false

  return nodemon({
    script: './bin/www'
  }).on('start', () => {
    // To avoid nodemon being started multiple times
    if (!started) {
      cb()
      started = true
    }
  })
})

gulp.task('serve', [
  'generate-service-worker',
  'es6',
  'sass',
  'browser-sync',
  'watch'
])

gulp.task(
  'build',
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
            discardComments: {removeAll: true}
          })
        )
      )
      .pipe(gulp.dest('./public'))
  }
)
