const express = require('express')
const router = express.Router()
const clientsController = require('../controller/clients.Controller')


router.post('/', clientsController.create)
router.post('/table', clientsController.createTable)

module.exports = router