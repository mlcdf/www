const express = require('express')
const compression = require('compression')
const path = require('path')
const favicon = require('serve-favicon')
const serveStatic = require('serve-static')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const sassMiddleware = require('node-sass-middleware')
const helmet = require('helmet')
const assets = require('./middlewares/assets')
const nunjucks = require('nunjucks')

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
app.set('view engine', 'njk')
// templace caching
app.enable('view cache')

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(
//   sassMiddleware({
//     src: path.join(__dirname, 'public'),
//     dest: path.join(__dirname, 'public'),
//     indentedSyntax: false, // true = .sass and false = .scss
//     sourceMap: true
//   })
// )

app.use(
  serveStatic(path.join(__dirname, 'public'), {
    setHeaders: setCustomCacheControl
  })
)

function setCustomCacheControl(res, path) {
  const fileMime = serveStatic.mime.lookup(path)
  if (
    fileMime === 'text/css'||
    fileMime === 'application/javascript'||
    fileMime === 'image/svg+xml'
  ) {
    // Custom Cache-Control for CSS & JS files
    res.setHeader('Cache-Control', 'public, max-age=31536000')
  }
}

app.use(assets('/', '/public'))

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
