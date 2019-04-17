const express = require('express')
const router = express.Router()
const clientController = require('../controller/client.Controller')


router.post('/table', clientController.createTable)
router.post('/', clientController.create)
router.get('/', clientController.selectAll)
router.get('/:keyword', clientController.clientSearch)


module.exports = router