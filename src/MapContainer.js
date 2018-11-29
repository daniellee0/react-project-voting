import React, { Component } from 'react';
import { MyMap } from './MyMap';
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';
import hash from 'object-hash'; //for making unique keys

export class MapContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
          targetYear: 2008,
          targetFocus: 'Total Registered Population',
          targetAge: '18-24'
        };
      }

    clickYear =  (value) => {
        console.log(value);
        this.setState({
            targetYear: parseInt(value)
        })
    }

    clickAge =  (value) => {
        console.log(value);
        this.setState({
            targetAge: value
        })
    }

    clickFocus =  (value) => {
        console.log(value);
        this.setState({
            targetFocus: value
        })
    }

    render() {
        let buttons = 
        <div>
            <select onChange={ (event) => this.clickYear(event.target.value)}>
                <option value="2008">2008</option>
                <option value="2010">2010</option>
                <option value="2012">2012</option>
                <option value="2014">2014</option>
                <option value="2016">2016</option>
            </select>

            <select onChange={ (event) => this.clickAge(event.target.value)}>
                <option value="18-24">18-24</option>
                <option value="25-34">25-34</option>
                <option value="35-44">35-44</option>
                <option value="45-54">45-54</option>
                <option value="55-64">55-64</option>
                <option value="65-">65+</option>
                <option value="0TOTAL">All</option>
            </select>

            <select onChange={ (event) => this.clickFocus(event.target.value)}>
                <option value="Total Registered Population">Registered Population</option>
                <option value="Total Voter Turnout">Voter Turnout</option>
            </select>
        </div>
        ;
        console.log(this.state.targetAge);
        return (
            <div id="map-container">
                {buttons}
                <div className="map leaflet-container">
                    <MyMap year={this.state.targetYear} age={this.state.targetAge} focus={this.state.targetFocus}></MyMap>
                </div>
            </div>
        );
    }
}