import React, { Component } from 'react';
import PropTypes from 'prop-types';


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
        isOpen: false
        };
    }
    
    toggle() {
        this.setState({
        isOpen: !this.state.isOpen
        });
    }

    render() {
        return (
        <div id="navbar">
            <Navbar color="transparent" light expand="md">
            <NavbarBrand href="/"><p>Voting</p></NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                <NavItem>
                    <NavLink href="/components/"><p>About</p></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="https://github.com/reactstrap/reactstrap"><p>Get Started</p></NavLink>
                </NavItem>
                </Nav>
            </Collapse>
            </Navbar>
        </div>
        );
    }
}

Navbar.propTypes = {
    light: PropTypes.bool,
    dark: PropTypes.bool,
    fixed: PropTypes.string,
    color: PropTypes.string,
    role: PropTypes.string,
    expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
    };

    NavbarBrand.propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
    // pass in custom element to use
    }