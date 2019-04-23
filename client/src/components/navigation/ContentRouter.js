import React from 'react'
import CustomerList from '../resourceList/CustomerList'
import test from '../resourceList/test'
import { Route } from 'react-router-dom'

const ContentRouter = props => {
    return (
        <React.Fragment>
            <Route exact path="/" component={CustomerList} />

        </React.Fragment>
    )
}
export default ContentRouter