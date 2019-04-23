import axios from 'axios'
import { setTimeout } from 'timers';

// Create an instance using the config defaults provided by the library
// At this point the timeout config value is `0` as is the default for the library
var instance = axios.create();

// Override timeout default for the library
// Now all requests will wait 2.5 seconds before timing out
instance.defaults.timeout = 500000;

// Override timeout for this request as it's known to take a long time

export default class ClientService {

    static createTable(data, onSuccess, onError) {
        instance.post(`/server/server.js/client/table`, data)
            .then(response => onSuccess(response))
            .catch(error => onError(error))
    }

    static create(data, onSuccess, onError) {
        console.log('client service create data: ', data)
        axios.post(`/server/server.js/client`, data)
            .then(response => onSuccess(response))
            .catch(err => onError(err))
    }

    static selectAll(onSuccess, onError) {
        axios.get(`/server/server.js/client`)
            .then(response => onSuccess(response))
            .catch(error => onError(error));
    }

    static selectByProfession(Profession, onSuccess, onError) {
        console.log('select by Profession name', Profession)
        axios.get(`/server/server.js/client/${Profession}`, Profession)
            .then(response => onSuccess(response))
            .catch(error => onError(error))
    }

    static clientSearch(keyword, onSuccess, onError) {
        console.log(`client search for ${keyword} start`)
        console.log('this is the client keyword:', keyword)
        const searchVal = {
            searchWord: keyword[0],
        };
        console.log('client servfice search value const: ', searchVal)
        axios.get(`/server/server.js/:${keyword}`, keyword)
            .then(response => onSuccess(response))
            .catch(error => onError(error))
    }
}