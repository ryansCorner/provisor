import axios from 'axios'

class ScraperService {
    static scrape(body, onSuccess, onError) {
        console.log('scraper service front end: ', body)
        axios.post(`/server/server.js/scrape`, body)
            .then(response => onSuccess(response.data))
            .catch(err => onError(err))
    }
}
export default ScraperService