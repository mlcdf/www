const router = require('express').Router() // eslint-disable-line new-cap
const config = require('../config/app.config')

const projects = require('../models/projects.json')

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', {
    title: config.name,
    description: config.description,
    projects,
    author: config.name,
    isHome: true
  })
})

router.get('/about', (req, res) => {
  res.render('about', {
    title: `${config.name} |  About`,
    description: config.description,
    author: config.name,
    isHome: false
  })
})

router.get('/offline', (req, res) => {
  res.render('offline', {
    title: `${config.name} |  About`,
    description: config.description,
    author: config.name
  })
})

module.exports = router
