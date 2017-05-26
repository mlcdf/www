const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Projects',
    projects: require('../models/projects.json'),
    isHome: true
  })
})

router.get('/about', (req, res, next) => {
  res.render('about', {
    title: 'About',
    isHome: false
  })
})

module.exports = router
