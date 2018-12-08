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

class StartForm extends Component {
    constructor(props) {
        super(props);
        this.state = {county: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    // Changes the county state of the App component.
    handleChange(event) {
        let callBack = this.props.adoptCallback;
        // this.setState({county: event.target.value});
        callBack(event.target.value);
    }

    render() {
        return (
            <form>
                <div id="name-input">
                    <label className="form-labels" htmlFor="name">County</label>
                    <input aria-label="Input County" type="text" name="name" id="name" placeholder="Name" onChange={this.handleChange}/>
                    {/* <input aria-label="Input County" type="text" name="name" id="name" placeholder="Name" value={this.state.county} onChange={ () => callBack(this.state.county)}/> */}
                </div>
                {/* <div id="address-input">
                    <label className="form-labels" htmlFor="address">Address</label>
                    <input aria-label="Input Address" type="text" name="address" id="address" placeholder="Address" />
                </div> */}
                {/* <div>
                    <button aria-label="Begin" type="button" id="begin-button" onClick={ () => callBack(this.state.county)}>Begin</button>
                </div> */}
            </form>
        );
    }
}