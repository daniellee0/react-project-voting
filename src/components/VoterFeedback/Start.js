import React, { Component } from 'react';

// Component representing the Start component of the web application. Here, the user can input their County
//to then  display the corresponding pie charts. 
export default class Start extends Component {

    // Renders a the start/get started and once the user presses the begin button, the county state changes
    // and this is used to display charts for a specific county.
    render() {
        return (
            <div id="get-started">
                <h2>Enter the Name of your County</h2>
                <p>Get started by simply following the provided instructions</p>
                <StartForm adoptCallback={this.props.adoptCallback}/>
            </div>
        );
    }
}

// Component that represents the form to enter in their county and have it displayed on the map
class StartForm extends Component {
    constructor(props) {
        super(props);
        this.state = {county: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    // Changes the county state of the App component.
    handleChange(event) {
        let callBack = this.props.adoptCallback;
        callBack(event.target.value);
    }

    // Renders the component. 
    render() {
        return (
            <form>
                <div id="name-input">
                    <label className="form-labels" htmlFor="name">County</label>
                    <input aria-label="Input County" type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange}/>
                </div>
            </form>
        );
    }
}