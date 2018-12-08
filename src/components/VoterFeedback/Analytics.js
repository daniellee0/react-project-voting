import React, { Component } from 'react';
import { MapContainer } from './Map/MapContainer';
import Charts from './Charts/Charts';

// Component that represents the analytics section that contains both the charts and map.
export default class Analytics extends Component {
    // Renders the header, charts, and map container. 
    render() {
        return (
            <div id="analytics">
                <AnalyticsHeader />
                <div id="analytics-container">
                    <div id="chart-legend" className="legend">
                        <Legend />
                    </div>
                    <Charts county={this.props.county}/>
                    <MapContainer county={this.props.county}></MapContainer>
                </div>
            </div>
        );
    }
}

// Legend that corresponds to the charts
class Legend extends Component {
    // Renders the Legend component
    render() {
        return (
            <div>
                <ul className="0-legend">
                    <li><span id="legend1"></span>Very Poor</li>
                    <li><span id="legend2"></span>Poor</li>
                    <li><span id="legend3"></span>Fair</li>
                    <li><span id="legend4"></span>Good</li>
                    <li><span id="legend5"></span>Very Good</li>
                </ul>
                <ul className="0-legend">
                    <li><span id="legend6"></span>Democrat</li>
                    <li><span id="legend7"></span>Republican</li>
                    <li><span id="legend8"></span>Other</li>
                </ul>
                <ul className="0-legend">
                    <li><span id="legend9"></span>Yes</li>
                    <li><span id="legend10"></span>No</li>
                </ul>
            </div>
        );
    }
}

// Header for the analytics section
class AnalyticsHeader extends Component {
    // Renders the header component.
    render() {
        return(
            <div id="analytics-header">
                <h2>Analytics</h2>
                <p>Learn more about voter turnout, satisfaction, and feedback.</p>
            </div>
        );
    }
}