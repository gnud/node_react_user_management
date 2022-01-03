import React from 'react';
import './footer.css';


export default class Footer extends React.Component {
    state = {
        currentDateTime: new Date().getFullYear()
    }

    render() {
        return (
            <footer className="page-footer">
                Copyright &copy; {this.state.currentDateTime} User Management Ltd. All rights left.
            </footer>
        )
    }
}
