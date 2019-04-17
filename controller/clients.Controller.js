// const ClientsService = require('../service/clientsServices')

module.exports = {
    create: (req, res) => {
        console.log('this is clients controller req.body: ', req.body)
        ClientsService.create(req.body)
            .then(response => {
                console.log('client controller response: ', response)
                res.status(201).json(response)
            })
    },
    createTable: (req, res) => {
        // console.log('this is the create table req', req.body)
        ClientsService.createTable(req.body)
            .then(UserId => {
                res.status(201).json(UserId)
                console.log('supposed UserId: ', UserId)
            })
    },
}