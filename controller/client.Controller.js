const ClientService = require('../service/clientService')

module.exports = {

    createTable: (req, res) => {
        // console.log('this is the create table req', req.body)
        ClientService.createTable(req.body)
            .then(UserId => {
                res.status(201).json(UserId)
                console.log('supposed UserId: ', UserId)
            })
    },

    create: (req, res) => {
        console.log('this is the create req: ', req.body)
        ClientService.create(req.body)
            .then(UserId => {
                res.status(201).json(UserId)
                console.log('supposed userId: ', UserId)
            })
    },

    selectAll: (req, res) => {
        ClientService.selectAll()
            .then(response => {
                console.log('the response from a successful selectAll: ', response)
                res.status(201).json(response)
            });
    },

    selectByProfession: (req, res) => {
        console.log('this is the get by username req: ', req)
        ClientService.selectByProfession(req)
            .then(Profession => {
                console.log('this should respond with the id: ', Profession)
                res.json(Profession)
            })
    },

    clientSearch: (req, res) => {
        console.log('this is the client search req.params: ', req)
        console.log('this is the client search req params keyword: ', req.params.keyword)
        ClientService.clientSearch(req.params.keyword)
            .then(response => {
                // console.log('this is the client search response: ', response)
                res.status(201).json(response)

            })
    }

}