import React from 'react'
import TextInput from '../../common/TextInput'
import Scraper from '../../services/scraperService'
import clientService from '../../services/ClientService'
import clientsService from '../../services/ClientsService'
import ClientList from '../clientList/ClientList';
import DataTable from '../../common/DataTable';
import CustomerList from '../resourceList/CustomerList';

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            website: '',
            region: '',
            profession: '',
            email: '',
            password: '',
            search: '',
            clientList: ''
        }
    }

    scrapeClicked = (event) => {
        Scraper.scrape(this.state, this.onScrapeSuccess, this.onScrapeError)
    }

    onScrapeError = err => {
        console.log('there was an err:', err)
    }

    onScrapeSuccess = res => {
        console.log(`scrape was successful we got ${res.length} clients`)

        clientService.createTable(res, this.onCreateClientSuccess, this.onCreateClientError)

    }


    onCreateClientSuccess = (event) => {
        console.log('client create success: ', event)
        console.log('create client successful')
    }

    onCreateClientError = err => {
        console.log('create client error', err)
    }

    onChangeTextInput = event => {
        const key = event.target.name;
        const val = event.target.value;
        this.setState({
            ...this.state,
            [key]: val,
        })
    }

    componentDidMount() {
        // clientService.selectAll(this.onSelectAllSuccess, this.onSelectAllError)
    }

    onSelectAllSuccess = event => {
        console.log('select all success ', event.data[0])
        this.setState({
            clientList: event.data[0]
        })

        // const clientList = event.data
        // clientList.map((client, idx) => {
        //     return (
        //         <React.Fragment>
        //             <div className="card" key={idx}>
        //                 {/* <img src="img_avatar.png" alt="Avatar" style={{ Width: "100%" }} /> */}
        //                 <div className="container">
        //                     <h4><b>{client.Name}</b></h4>
        //                     <p>{client.Profession}</p>
        //                 </div>
        //             </div>
        //         </React.Fragment>
        //     )
        // })
    }
    onSelectAllError = error => {
        console.log('select all error ', error)
    }

    clientSearch = keyword => {
        clientService.clientSearch(this.state.search, this.onSearchSuccess, this.onSearchError)
    }

    onSearchSuccess = event => {
        console.log('search success', event)

        const client = event.data

        const myArr = []
        for (var i = 0; i <= client.length - 1; i++) {
            var propArray = []
            for (var prop in client[i]) {
                propArray.push(client[i][prop])
            }
            myArr.push(propArray)
        }
        console.log('my arry of row data', myArr)
        console.log('my arry ofclient[0].length', client[0])

        const keyArr = []
        for (var x = 0; x < Object.keys(client[0]).length; x++) {
            keyArr.push(Object.keys(client[0])[x])
        }


        console.log('my arr of keys ', keyArr)

        this.setState({
            ...this.state,
            clientList: event.data,
            headings: keyArr,
            rows: myArr,
        })

    }

    onSearchError = error => {
        console.log('search failed')
    }

    renderDataTable = props => {
        console.log('data props', props)
        return (
            <CustomerList customers={props} />
        )

    }



    render() {
        console.log('this.state', this.state)

        return (
            <React.Fragment>
                <form className=''>
                    <TextInput
                        type='text'
                        id='websiteInput'
                        name='website'
                        label='website'
                        value={this.state.website}
                        onChange={this.onChangeTextInput}
                        placeholder='www.your-website.com'

                    />
                    <TextInput
                        type='text'
                        id='regionInput'
                        name='region'
                        label='region'
                        value={this.state.region}
                        onChange={this.onChangeTextInput}
                        placeholder='Beverly Hills, CA'
                    />
                    <TextInput
                        type='text'
                        id='professionInput'
                        name='profession'
                        label='profession'
                        value={this.state.profession}
                        onChange={this.onChangeTextInput}
                        placeholder='Banker'
                    />
                    <TextInput
                        type='email'
                        id='emailInput'
                        name='email'
                        label='email'
                        value={this.state.email}
                        onChange={this.onChangeTextInput}
                        placeholder='janedoe@aol.com'
                    />
                    <TextInput
                        type='password'
                        id='passwordInput'
                        name='password'
                        label='password'
                        value={this.state.password}
                        onChange={this.onChangeTextInput}
                        placeholder=''
                    />
                    <button className='btn-primary'
                        type='button'
                        onClick={() => this.scrapeClicked()}
                    >SUBMIT</button>
                </form>

                {/* <ClientList  data={this.state.clientList}/> */}
                {this.state.clientList && (
                    <div>
                        <CustomerList customers={this.state.clientList} />
                        {/* <DataTable headings={this.state.headings} rows={this.state.rows} /> */}
                        {/* <ClientList data={this.state.clientList} /> */}
                    </div>
                )}
                {/* <div className='table'>
                    <table>
                        <tr>
                            <th>Name</th>
                            <th>Profession</th>
                            <th>Company</th>
                            <th>Region</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                        {clientMap}

                    </table>

                </div> */}
                <TextInput
                    type='text'
                    id='searchInput'
                    name='search'
                    label='search'
                    value={this.state.search}
                    onChange={this.onChangeTextInput}
                    placeholder='search parameter'
                />
                <button className='btn-primary'
                    type='button'
                    onClick={() => this.clientSearch()}
                >SUBMIT</button>

            </React.Fragment>
        )
    }
}
export default Form