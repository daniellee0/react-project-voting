import React, { Component } from 'react';
import { MyMap } from './MyMap';
import {DropdownButton, MenuItem, ButtonToolbar} from 'react-bootstrap';
import hash from 'object-hash'; //for making unique keys

export class MapContainer extends Component {

    constructor(props){
        super(props)
        this.state = {
          targetYear: 2016,
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
        <ButtonToolbar>
            <DropdownButton
                bsStyle="primary"
                bsSize="large"
                title="Year"
                id="dropdown-age"
                noCaret
            >
            <MenuItem eventKey="2008" onSelect={this.clickYear}>2008</MenuItem>
            <MenuItem eventKey="2010" onSelect={this.clickYear}>2010</MenuItem>
            <MenuItem eventKey="2012" onSelect={this.clickYear}>2012</MenuItem>
            <MenuItem eventKey="2014" onSelect={this.clickYear}>2014</MenuItem>
            <MenuItem eventKey="2016" onSelect={this.clickYear}>2016</MenuItem>
            </DropdownButton>

            <DropdownButton
                bsStyle="primary"
                bsSize="large"
                title="Age"
                id="dropdown-age"
                noCaret
            >
            <MenuItem eventKey="18-24" onSelect={this.clickAge}>18-24</MenuItem>
            <MenuItem eventKey="25-34" onSelect={this.clickAge}>25-34</MenuItem>
            <MenuItem eventKey="35-44" onSelect={this.clickAge}>35-44</MenuItem>
            <MenuItem eventKey="45-54" onSelect={this.clickAge}>45-54</MenuItem>
            <MenuItem eventKey="55-64" onSelect={this.clickAge}>55-64</MenuItem>
            <MenuItem eventKey="65-" onSelect={this.clickAge}>65+</MenuItem>
            <MenuItem eventKey="0TOTAL" onSelect={this.clickAge}>All</MenuItem>
            </DropdownButton>

            <DropdownButton
                bsStyle="primary"
                bsSize="large"
                title="Focus"
                id="dropdown-age"
                noCaret
            >
            <MenuItem eventKey="Total Registered Population" onSelect={this.clickFocus}>Registered Population</MenuItem>
            <MenuItem eventKey="Total Voter Turnout" onSelect={this.clickFocus}>Voter Turnout</MenuItem>
            </DropdownButton>
        </ButtonToolbar>
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