const fs = require('fs')
const path = require('path')
const cs = require('checksum')

module.exports = function (urlPrefix, rootPath) {
  const cache = []
  const env = process.env.NODE_ENV

  const checksumify = file => {
    if (cache[file]) {
      return cache[file]
    }

    const filePath = path.join('..', rootPath, file)
    const fileUrl = path.join(urlPrefix, file).replace(/\\/g, '/')
    if (!fs.existsSync(path.join(__dirname, filePath))) {
      return fileUrl
    }

    var data = fs.readFileSync(path.join(__dirname, filePath))
    cache[file] = fileUrl + '?' + cs(data).substr(0, 10)
    return cache[file]
  }

  return function(req, res, next) {
    res.locals.asset = function(file, prodFile) {
      console.log('middlewares::assets')
      return checksumify(prodFile && env === 'production' ? prodFile : file)
    }
    next()
  }
}
