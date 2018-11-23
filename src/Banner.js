import React, { Component } from 'react';

export default class Banner extends Component {
  
    render() {
      return (
        <div id="banner">
            <h1><a href="index.html">Voting</a></h1>
            <p>A review platform for voters to make their voices heard.</p>
            <div id="banner-buttons">
                <a href="#get-started" role="button" id="start-button">Get Started</a>
                <a href="about.html" role="button" id="learn-button">Learn More</a>
            </div>
        </div>
      );
    }
  }