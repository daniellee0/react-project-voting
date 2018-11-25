import React, { Component } from 'react';
import {MyMap} from './MyMap';

export default class Analytics extends Component {
    render() {
        return (
            <div id="analytics">
                <div id="analytics-header">
                    <h2>Analytics</h2>
                    <p>Learn more about voter turnout, satisfaction, and feedback.</p>
                    <button id="add-chart">Add Chart</button>
                </div>
                <div id="analytics-container">
                    <div className="chart">
                        <canvas className="chart1"></canvas>
                    </div>
                    <div className="map leaflet-container">
                        <MyMap></MyMap>
                    </div>
                </div>
            </div>
        );
    }
}