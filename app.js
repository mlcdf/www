const path = require('path')

const bodyParser = require('body-parser')
const compression = require('compression')
const cookieParser = require('cookie-parser')
const express = require('express')
const helmet = require('helmet')
const logger = require('morgan')
const nunjucks = require('nunjucks')
const serveFavicon = require('serve-favicon')
const serveStatic = require('serve-static')

const assets = require('./middlewares/assets')

const index = require('./routes/index')

const app = express()

app.use(helmet())
app.use(compression())


const env = nunjucks.configure(path.join(__dirname, 'views'), {
  autoescape: true,
  cache: false,
  express: app
})

// Sets Nunjucks as the Express template engine
app.set('engine', env)
app.set('view engine', 'njk') // TODO: rename njk to nunjucks (don't forget to also rename the template files)
// templace caching
app.enable('view cache')

app.use(logger('dev')) // what does this do ?
app.use(bodyParser.json()) // what does this do ?
app.use(bodyParser.urlencoded({ extended: false })) // what does this do ?
app.use(cookieParser()) // what does this do ?

app.use(serveFavicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(
  serveStatic(path.join(__dirname, 'public'), {
    setHeaders: setCustomCacheControl
  })
)

function setCustomCacheControl(res, filePath) {
  const fileMime = serveStatic.mime.lookup(filePath)

  if (filePath === path.join(__dirname, 'public/sw.js')) {
    // https://toot.cafe/@nolan/614271
    res.setHeader('Cache-Control', 'public, max-age=0')
  }

  if (fileMime === 'text/html') {
    res.setHeader('Cache-Control', 'no-cache')
  }

  if (
    fileMime === 'text/css' ||
    fileMime === 'application/javascript' ||
    fileMime === 'image/svg+xml'
  ) {
    // Custom Cache-Control for CSS & JS files
    res.setHeader('Cache-Control', 'public, max-age=31536000')
  }
}

// Custom Middlewares
app.use(assets('/', '/public'))

// Custom routes
app.use('/', index)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
