import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import './nav-bar.css';


export default class NavBar extends React.Component {
    state = {
        name: ''
    }

    handleChange = event => {
        this.setState({name: event.target.value});
    }

    render() {
        return (
            <>
            <Navbar expand="lg" variant="dark" bg="dark" className="navbar-fixed">
                <Navbar.Brand href="/" className="navbar-brand-container">
                    <FontAwesomeIcon icon="users" size="2x"  />
                    {' '} <span className="navbar-brand-title">User Management ltd.</span>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#link">Link</Nav.Link>
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item>Action</NavDropdown.Item>
                            <NavDropdown.Item>Another action</NavDropdown.Item>
                            <NavDropdown.Item>Something</NavDropdown.Item>
                            <NavDropdown.Divider/>
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    </>
    )
    }
}
