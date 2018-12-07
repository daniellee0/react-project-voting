import React, { Component } from 'react';
import NavbarFeatures from './Navbar';
import Banner from './Banner';

// Represents the Header of the app
export default class Header extends Component {
  render() {
    return (
      // Passes in dark and light prop to navbarfeatures to indicate the styling of the navbar
      <header>
        <NavbarFeatures dark={true} light={false}/>
        <Banner />
      </header>
    );
  }
}