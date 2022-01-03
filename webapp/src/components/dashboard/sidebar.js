
import React from 'react';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
// noinspection ES6UnusedImports
// eslint-disable-next-line
import * as Icons from '@fortawesome/fontawesome-free-solid';
import {Link} from "react-router-dom";

import './sidebar.css';


export default class Sidebar extends React.Component {
    state = {
        name: ''
    }

    handleCollapse() {
        const collapsedClass = "collapsed";

        const body = document.body;

        body.classList.toggle(collapsedClass);
    }

    render() {
        return (
            <header className="page-header">
                <nav>
                    <button onClick={this.handleCollapse} className="collapse-btn" aria-expanded="true"
                            aria-label="collapse menu">
                        <FontAwesomeIcon icon="bars" size="2x"/>
                    </button>
                    <button className="toggle-mob-menu" aria-expanded="false" aria-label="open menu">
                    </button>
                    <ul className="admin-menu">
                        <li className="menu-heading">
                            <h3>Users</h3>
                        </li>
                        <li>
                            <Link to="/users">
                                <FontAwesomeIcon icon="list" size="2x"/>
                                <span>List users</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/users/create">
                                <FontAwesomeIcon icon="user-plus" size="2x"/>
                                <span>Create Users</span>
                            </Link>
                        </li>
                        <li></li>
                    </ul>
                </nav>
            </header>
        )
    }
}
