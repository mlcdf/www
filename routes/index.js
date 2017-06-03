const router = require('express').Router()
const config = require('../config/app.config')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: config.name,
    description: config.description,
    projects: require('../models/projects.json'),
    author: config.name,
    isHome: true
  })
})

router.get('/about', (req, res, next) => {
  res.render('about', {
    title: config.name + ' |  About',
    description: config.description,
    author: config.name,
    isHome: false
  })
})

router.get('/offline', (req, res, next) => {
  res.render('offline', {
    title: config.name + ' |  About',
    description: config.description,
    author: config.name
  })
})

module.exports = router
