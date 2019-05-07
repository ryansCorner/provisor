const sql = require('../mssql')
const TYPES = require('tedious').TYPES
const iDataAccess = require('./interfaces.js/iDataService')()
const jsonfile = require('jsonfile')

const file = './clients.json'
// const obj = { name: 'JP' }


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
    console.log('my array :', myArr.length)

    const clientObj = Object.setPrototypeOf(myArr, Object.prototype); // now no longer an array, still an object


    console.log('client obj', clientObj.length)



    var table = {

        columns: [
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
        .executeProc('ClientTableInsert', request => {

            request.addParameter('ClientTableType', TYPES.TVP, table)
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

const create = (client) => {
    console.log('this is the client data!!! ', client)
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
            // request.addOutputParameter('UserId', TYPES.Int, 1)

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

const selectAll = () => {
    // console.log('select all backside service')
    return sql
        .executeProc('Client_SelectAll')
        .then(
            response => response.resultSets ? response.resultSets[0] : []
        )

}



const clientSearch = (keyword) => {
    console.log('this is the search word', keyword.replace(':', ''))
    const searchVal = keyword.replace(':', '')
    const newSearchVal = searchVal.replace(',[object Object]', '')
    return sql
        .executeProc('Client_Search', request => {
            request.addParameter('search', TYPES.NVarChar, newSearchVal)
            request.addParameter('sortBy', TYPES.NVarChar, 'Name')
            request.addParameter('sortOrder', TYPES.NVarChar, 'ASC')
            request.addParameter('pageNumber', TYPES.Int, 1)
            request.addParameter('rowsToDisplay', TYPES.Int, 1000)

        })
        .then(response => {
            console.log('this is the search response: ', response.resultSets)
            jsonfile.writeFile(file, response.resultSets, { spaces: 2 })
                .then(res => {
                    console.log('Write complete')
                })
                .catch(error => console.error(error))
            return response.resultSets[0]
        })
        .catch(err => {
            console.log('get all err', err)
            return err
        })
}

iDataAccess.create = create;
iDataAccess.selectAll = selectAll;
iDataAccess.clientSearch = clientSearch;
iDataAccess.createTable = createTable;
module.exports.createTable = createTable;
module.exports.clientSearch = clientSearch;