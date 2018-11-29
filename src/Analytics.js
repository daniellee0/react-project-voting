import React, { Component } from 'react';
import { MapContainer } from './MapContainer';
import Charts from './Charts';

export default class Analytics extends Component {
    render() {
        return (
            <div id="analytics">
                <div id="analytics-header">
                    <h2>Analytics</h2>
                    <p>Learn more about voter turnout, satisfaction, and feedback.</p>
                </div>
                <div id="analytics-container">
                    <Charts county={this.props.county}/>
                    <MapContainer></MapContainer>
                </div>
            </div>
        );
    }
}