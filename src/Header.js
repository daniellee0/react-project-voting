import React, { Component } from 'react';
import NavbarFeatures from './Navbar';
import Banner from './Banner';

  
export default class Header extends Component {
  render() {
    return (
      <header>
        <NavbarFeatures />
        <Banner />
      </header>
    );
  }
}