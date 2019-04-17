const scraperRoutes = require('express').Router();
const ScrapeContoller = require('../controller/scrape.Controller')

scraperRoutes.post('/', ScrapeContoller.scrape);

module.exports = scraperRoutes;