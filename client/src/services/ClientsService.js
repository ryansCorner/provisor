import axios from 'axios'

export default class ProfileServices {
    static create(data, onSuccess, onError) {
        axios.post(`/server/server.js/clients`, data)
            .then(response => onSuccess(response))
            .catch(error => onError(error))
    }

    static createTable(data, onSuccess, onError) {
        axios.post(`/server/server.js/clients/table`, data, setTimeout(500000))
            .then(response => onSuccess(response))
            .catch(error => onError(error))
    }


}