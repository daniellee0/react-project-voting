import React, { Component } from 'react';
import { MyMap } from './MyMap';

// Component representing the container for the map
export class MapContainer extends Component {
    // Sets the state for the map container
    constructor(props){
        super(props)
        this.state = {
          targetYear: 2008,
          targetFocus: 'Total Registered Population',
          targetAge: '18-24'
        };
      }

    // Changes the target year on click by taking in a target value 
    clickYear =  (value) => {
        console.log(value);
        this.setState({
            targetYear: parseInt(value)
        })
    }

    // Changes the age on click by taking in a target value 
    clickAge =  (value) => {
        console.log(value);
        this.setState({
            targetAge: value
        })
    }

    // Changes the focus year on click by taking in a target value 
    clickFocus =  (value) => {
        console.log(value);
        this.setState({
            targetFocus: value
        })
    }

    // Renders the map itself and the drop down menues to modify the data being displayed.
    render() {
        let buttons = 
        <div id="map-options">
            <label htmlFor="clickYear">Year</label>
            <select aria-label="Change Year" id="clickYear"onChange={ (event) => this.clickYear(event.target.value)}>
                <option value="2008">2008</option>
                <option value="2010">2010</option>
                <option value="2012">2012</option>
                <option value="2014">2014</option>
                <option value="2016">2016</option>
            </select>

            <label htmlFor="clickAge">Age</label>
            <select aria-label="Change Age" id="clickAge"onChange={ (event) => this.clickAge(event.target.value)}>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65-">65+</option>
                <option value="0TOTAL">All</option>
            </select>

            <label htmlFor="clickFocus">Focus</label>
            <select aria-label="Change Year" id="clickFocus" onChange={ (event) => this.clickFocus(event.target.value)}>
                <option value="Total Registered Population">Registered Population</option>
                <option value="Total Voter Turnout">Voter Turnout</option>
            </select>
        </div>
        ;
        return (
            <div id="map-container">
                <h4>WA Voter Registration Data by County</h4>
                {buttons}
                <div className="map leaflet-container">
                    <MyMap year={this.state.targetYear} age={this.state.targetAge} focus={this.state.targetFocus} county={this.props.county}></MyMap>
                </div>
            </div>
        );
    }
}