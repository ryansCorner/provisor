const router = require('express').Router();
const clientRoutes = require('./Client.Routes')
const scrapeRoutes = require('./scraper.Routes')
const clientsRoutes = require('./Clients.Routes')

module.exports = router;

router.use('/scrape', scrapeRoutes)
router.use('/client', clientRoutes)
router.use('/clients', clientsRoutes)