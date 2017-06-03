const appConfig = require('../config/app.config')

module.exports = function(req, res, next) {
  const engine = req.app.get('engine')
  engine.addGlobal('app', appConfig)
  next()
}
