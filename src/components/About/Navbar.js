import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import firebase from 'firebase/app';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink,
    NavbarBrand} from 'reactstrap';

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
                <Navbar dark={this.props.dark} light={this.props.light} expand="md">
                <NavbarBrand tag={Link} to="/">VoteFact</NavbarBrand>
                <NavbarToggler onClick={this.toggle} className="mr-2" aria-label="Navbar Toggle"/>
                <Collapse isOpen={this.state.isOpen} navbar>
                    <NavItems />
                </Collapse>
                </Navbar>
            </nav>
        );
    }
}

// Component that represents the navigation bar items. These items can be clicked on and the user will be navigated to
// the various paths. 
class NavItems extends Component {

    render() {
        let user = firebase.auth().currentUser;

        return(
            <Nav navbar className="ml-auto">
                <NavItem>
                    <NavLink tag={Link} to="/votefeedback">Feedback</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} to="/justices">Justices</NavLink>
                </NavItem>
                {!user ? <NavItem>
                            <NavLink tag={Link} to="/signin">Sign In</NavLink>
                        </NavItem> : <div></div>}
                {user ? <NavItem>
                            <NavLink id="signout" tag={Link} to="/signout">Sign Out</NavLink>
                        </NavItem> : <div></div>}
            </Nav>
        );
    }
}
