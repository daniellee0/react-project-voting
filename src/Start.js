import React, { Component } from 'react';

export default class Start extends Component {
    constructor(props) {
        super(props);
        this.state = {county: ""};
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({county: event.target.value});
    }

    render() {
        let callBack = this.props.adoptCallback;
        return (
            <div id="get-started">
                <h2>Enter the Name and Address of Your Polling Location</h2>
                <p>Get started by simply following the provided instructions</p>
                <form>
                    <div id="name-input">
                        <label className="form-labels" htmlFor="name">County</label>
                        <input type="text" name="name" id="name" placeholder="Name" value={this.state.county} onChange={this.handleChange}/>
                    </div>
                    <div id="address-input">
                        <label className="form-labels" htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" placeholder="Address" />
                    </div>
                    <div>
                        <button type="button" id="begin-button" onClick={ () => callBack(this.state.county)}>Begin</button>
                    </div>
                </form>
            </div>
        );
    }
}