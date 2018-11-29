import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

// Comonent representing the navigation bar so the user can navigate the web application.
export default class NavbarFeatures extends Component {
    // Constructor sets state for navigation
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    
    // Changes the state isOpen on toggle.
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }

    // Renders the navigation bar with options to navigate to Home, About, and to get started. 
    render() {
        return (
            <nav>
                <Navbar color="transparent" dark={this.props.dark} light={this.props.light} expand="md">
                <NavbarToggler onClick={this.toggle} className="mr-2" aria-label="Navbar Toggle"/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav navbar>
                        <NavItem id="home-button">
                            <NavLink tag={Link} to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/about">About</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} to="/home#get-started">Get Started</NavLink>
                        </NavItem>
                    </Nav>
                </Collapse>
                </Navbar>
            </nav>
        );
    }
}
