import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';


import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink} from 'reactstrap';

export default class NavbarFeatures extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
        };
    }
    
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }

    render() {
 
        return (
        <nav>
            <Navbar color="transparent" dark expand="md">
            {/* <NavbarBrand href="/"><p>Voting</p></NavbarBrand> */}
            <NavbarToggler onClick={this.toggle} />
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
