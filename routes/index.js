var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Projects',
    projects: require('../models/projects.json'),
    isHome: true
  })
})

router.get('/about', function(req, res, next) {
  res.render('about', {
    title: 'About',
    isHome: false
  })
})

module.exports = router
