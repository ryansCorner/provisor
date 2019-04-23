import React from 'react'
import { withRouter } from 'react-router-dom'
import ContentRouter from './ContentRouter';

class Layout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <ContentRouter />
            </React.Fragment>
        )
    }
}

export default withRouter(Layout)