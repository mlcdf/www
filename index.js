const router = require('express').Router() // eslint-disable-line new-cap

const website = require('../data/website')

/* GET API */
router.get('/api', (req, res) => {
  res.json(website)
})

/* GET home page */
router.get('/', (req, res) => {
  res.render('index', {
    title: website.author.name,
    description: website.description,
    author: website.author,
    isHome: true
  })
})

/* GET any HTML pages */
router.get('/:page', (req, res) => {
  res.render(req.params.page, {
    title: `${website.author.name} |  ${req.params.page}`,
    description: website.description,
    author: website.author.name,
    isHome: false
  })
})

module.exports = router
