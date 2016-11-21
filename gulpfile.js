const cp = require('child_process')
const browserSync = require('browser-sync').create()
const gulp = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const svgmin = require('gulp-svgmin')
const pngcrush = require('imagemin-pngcrush')
const size = require('gulp-size')
const plumber = require('gulp-plumber')
const htmlmin = require('gulp-htmlmin')

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], () => {
  browserSync.init({
    server: {
      baseDir: '_site'
    }
  })
})

/**
 * Build the Jekyll Site
 */
gulp.task('jekyll-build', (done) => {
  browserSync.notify('Building Jekyll')
  return cp.spawn('jekyll', ['build', '-q'], {stdio: 'inherit'})
    .on('close', done)
})

/**
 * Rebuild Jekyll & do page reload
 */
gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  browserSync.reload()
})

// Task to optimize and minify svg
gulp.task('minify-svg', () => {
  gulp.src('./img/svg')
    .pipe(svgmin())
    .pipe(gulp.dest('./img/svg'))
})

gulp.task('minify-img', () => {
  gulp.src('./img/*')
    .pipe(size({gzip: false, showFiles: true, title: 'original image size'}))
    .pipe(size({gzip: true, showFiles: true, title: 'original image size'}))
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(size({gzip: false, showFiles: true, title: 'minified images'}))
    .pipe(size({gzip: true, showFiles: true, title: 'minified images'}))
    .pipe(gulp.dest('./img')) // change the dest if you don't want your images overwritten
})

gulp.task('minify-html', () => {
  return gulp.src('./_site/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./_site'))
})

// Task that compiles scss files down to good old css
gulp.task('sass', () => {
  return gulp.src('./_sass/main.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano({
      discardComments: {
        removeAll: true
      }
    }))
    .pipe(gulp.dest('./css'))
})

gulp.task('generate-service-worker', function (callback) {
  const path = require('path')
  const swPrecache = require('sw-precache')

  swPrecache.write(path.join('service-worker.js'), {
    staticFileGlobs: [
      '/',
      'index.html',
      'css/main.css',
      'about/',
      'about/index.html',
      'projects/',
      'projects/index.html',
      'scripts/app.js',
      'manifest.json',
      'favicon.ico',
      'assets/images/favicons/*.*'],
    stripPrefix: ''
  }, callback)
})

gulp.task('production', [
  'jekyll-build',
  'sass',
  'generate-service-worker',
  'minify-img',
  'minify-svg'], () => {
    gulp.run('minify-html') // Hack to that minify-html doesn't start before the end of jekyll-build
  }
)

gulp.task('watch', () => {
  // Watch .scss files
  gulp.watch('_sass/**/*.scss', ['sass'])
   // Watch .html files and posts
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', 'projects/*.*', 'about/*.*', '_posts/*.*', '_sass/**/*.scss', 'js/**/*', 'images/*'], ['jekyll-rebuild'])
})

gulp.task('default', ['generate-service-worker', 'browser-sync', 'watch'])
