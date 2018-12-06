import React, { Component } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

// Component representing the banner of the web app
export default class Banner extends Component {
    render() {
      return (
        // Made up of the main banner and navigating buttons
        <div id="banner">
            <h1><Link to="/home">VoteFact</Link></h1>
            <p>A review and analytics platform for voters to learn and track justices, voter turnout, and leave feedback</p>
            <Buttons />
        </div>
      );
    }
}

// Component representing the buttons for the the main banner. THese buttons link to
// the start section and the about page.
class Buttons extends Component {
  render() {
    return(
      <div id="banner-buttons">
        <Link to="/home#get-started" role="button" id="start-button">Get Started</Link>
        <Link to="/" role="button" id="learn-button">Learn More</Link>
        <Link to="/justices" role="button" id="learn-button">Justices</Link>
      </div>
    );
  }
}