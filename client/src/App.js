import React, { Component } from 'react';
import banner from './footer_center-9404150a5f5fc878d7723ed40bd7f3a209ffab03d398432f8d60a46edcfb714c.png'
import './App.css';
import Form from './components/form/Form';
import ClientList from './components/clientList/ClientList';
import { AppProvider } from '@shopify/polaris'
import CustomerList from './components/resourceList/CustomerList';
// import ClientService from './services/ClientService'
import axios from 'axios'
import { withRouter } from 'react-router-dom';
import ContentRouter from './components/navigation/ContentRouter'
import Layout from './components/navigation/Layout';


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      customers: '',

    }
  }

  render() {
    return (
      <AppProvider>
        <React.Fragment>

          <div className="App">
            <div>
              <Layout />

            </div>
          </div>
        </React.Fragment>

      </AppProvider>
    );
  }
}

export default withRouter(App);
