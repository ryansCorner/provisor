const sql = require('../mssql')
const TYPES = require('tedious').TYPES
const iDataAccess = require('./interfaces.js/iDataService')()

const create = (client) => {
    console.log('this is the backend create service')
    return sql
        .executeProc('Clients_Insert', request => {
            request.addParameter('Name', TYPES.NVarChar, client.Name)
            request.addParameter('Profession', TYPES.NVarChar, client.Profession)
            request.addParameter('Title', TYPES.NVarChar, client.Title)
            request.addParameter('Specialty', TYPES.NVarChar, client.Specialty)
            request.addParameter('Company', TYPES.NVarChar, client.Company)
            request.addParameter('Address', TYPES.NVarChar, client.Address)
            request.addParameter('Region', TYPES.NVarChar, client.Region)
            request.addParameter('Email', TYPES.NVarChar, client.Email)
            request.addParameter('Phone', TYPES.NVarChar, client.Phone)
            request.addParameter('Website', TYPES.NVarChar, client.Website)
            request.addParameter('LinkedIn', TYPES.NVarChar, client.LinkedIn)
            request.addParameter('MemberSince', TYPES.NVarChar, client.MemberSince)
            request.addOutputParameter('UserId', TYPES.Int, 1)
        })
        .then(response => {
            console.log('this is the backend create service response', response)
            return response
        })
        .catch(error => {
            console.error('this is the backend create error: ', error)
            return error
        })
}
const createTable = (client) => {
    console.log('this is the client var: ', client)
    const myArr = []
    for (var i = 0; i <= client.length - 1; i++) {
        var propArray = []
        for (var prop in client[i]) {
            propArray.push(client[i][prop])
        }
        myArr.push(
            propArray
        )
    }
    console.log('my array :', myArr)

    const clientObj = Object.setPrototypeOf(myArr, Object.prototype); // now no longer an array, still an object


    console.log('client obj', clientObj)



    var table = {

        columns: [
            { name: 'UserId', type: TYPES.Int },
            { name: 'Name', type: TYPES.NVarChar, length: 1000 },
            { name: 'Profession', type: TYPES.NVarChar, length: 1000 },
            { name: 'Title', type: TYPES.NVarChar, length: 1000 },
            { name: 'Specialty', type: TYPES.NVarChar, length: 1000 },
            { name: 'Company', type: TYPES.NVarChar, length: 1000 },
            { name: 'Address', type: TYPES.NVarChar, length: 1000 },
            { name: 'Region', type: TYPES.NVarChar, length: 1000 },
            { name: 'Email', type: TYPES.NVarChar, length: 1000 },
            { name: 'Phone', type: TYPES.NVarChar, length: 1000 },
            { name: 'Website', type: TYPES.NVarChar, length: 1000 },
            { name: 'LinkedIn', type: TYPES.NVarChar, length: 1000 },
            { name: 'MemberSince', type: TYPES.NVarChar, length: 1000 }
        ],
        rows: myArr

        // [
        //     [
        //         client[x].Name, client[x].Profession, client[x].Title, client[x].Specialty, client[x].Company, client[x].Address,
        //         client[x].Region, client[x].Email, client[x].Phone, client[x].Website, client[x].LinkedIn, client[x].MemberSince
        //     ]
        // ]
    }





    console.log('clientId: ', client.Name)

    return sql
        .executeProc('Clients_Table_Insert', request => {
            console.log('table: ', table)

            request.addParameter('ClientsTableType', TYPES.TVP, table)
        })
        .then(response => {
            console.log('this is the response from the create Client ', response)
            return response
        })
        .catch(err => {
            console.log('this is the create service error', err)
            return err
        })
}


module.exports.create = create
module.exports.createTable = createTable