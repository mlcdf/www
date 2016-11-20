const gulp = require('gulp')
const watch = require('gulp-watch')
const autoprefixer = require('gulp-autoprefixer')
const cssnano = require('gulp-cssnano')
const sass = require('gulp-sass')
const imagemin = require('gulp-imagemin')
const svgmin = require('gulp-svgmin')
const size = require('gulp-size')
const rename = require('gulp-rename')
const cp = require('child_process')
const pngcrush = require('imagemin-pngcrush')
const browserSync = require('browser-sync')
const csslint = require('gulp-csslint')
const plumber = require('gulp-plumber')

/**
 * Wait for jekyll-build, then launch the Server
 */
gulp.task('browser-sync', ['sass', 'jekyll-build'], () => {
  browserSync({
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

gulp.task('minify-css', () => {
  gulp.src('./css/nkd.css') // set this to the file(s) you want to minify.
    .pipe(cssnano())
    .pipe(size({gzip: false, showFiles: true, title: 'minified css'}))
    .pipe(size({gzip: true, showFiles: true, title: 'minified css'}))
    .pipe(rename('nkd.min.css'))
    .pipe(gulp.dest('./css/'))
})

// Task to optimize and minify svg
gulp.task('minify-svg', () => {
  gulp.src('./img/svg')
      .pipe(svgmin())
      .pipe(gulp.dest('./img/svg'))
})

gulp.task('minify-images', () => {
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

// Use csslint without box-sizing or compatible vendor prefixes (these
// don't seem to be kept up to date on what to yell about)
gulp.task('csslint', () => {
  gulp.src('./css/*.css')
    .pipe(csslint({
      'compatible-vendor-prefixes': false,
      'box-sizing': false,
      'important': false
    }))
    .pipe(csslint.reporter())
})

// Task that compiles scss files down to good old css
gulp.task('sass', () => {
  gulp.src('./_sass/nkd.scss')
      .pipe(watch((files) => {
        return files.pipe(plumber())
          .pipe(sass())
          .pipe(size({gzip: false, showFiles: true, title: 'without vendor prefixes'}))
          .pipe(size({gzip: true, showFiles: true, title: 'without vendor prefixes'}))
          .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
          }))
          .pipe(size({gzip: false, showFiles: true, title: 'after vendor prefixes'}))
          .pipe(size({gzip: true, showFiles: true, title: 'after vendor prefixes'}))
          .pipe(gulp.dest('css'))
          .pipe(cssnano({
            discardComments: {
              removeAll: true
            }
          }))
          .pipe(size({gzip: false, showFiles: true, title: 'minified css'}))
          .pipe(size({gzip: true, showFiles: true, title: 'minified css'}))
          .pipe(rename('nkd.min.css'))
      }))
})

gulp.task('production', () => {
  gulp.run('minify-css', 'minify-img', 'minify-svg')
})

gulp.task('watch', () => {
  // Watch .scss files
  gulp.watch('_sass/**/*.scss', ['sass'])
   // Watch .html files and posts
  gulp.watch(['index.html', '_layouts/*.html', '_includes/*.html', 'projects/*.*', 'about/*.*', '_posts/*.*', '_sass/**/*.scss', 'js/**/*', 'images/*'], ['jekyll-rebuild'])
})

gulp.task('default', ['browser-sync', 'watch'])
