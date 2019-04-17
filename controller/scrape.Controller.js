// const proScrape = require('../../src/scraper/proScrape')
module.exports = {
    scrape: (req, res) => {
        console.log('this is the scraper req: ', req.body)
        const regionList = req.body.region.split(', ')
        console.log('region list: ', regionList)
        proScrape(
            req.body.website,
            regionList,
            req.body.profession,
            req.body.email,
            req.body.password
        )
            .then(response => {
                res.json(response)
                // console.log('this is the res: ', response)
            })
            .catch(error => console.log(error))
    }
}