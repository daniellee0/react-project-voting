import React, { Component } from 'react';

export default class Start extends Component {
    render() {
        return (
            <div id="get-started">
                <h2>Enter the Name and Address of Your Polling Location</h2>
                <p>Get started by simply following the provided instructions</p>
                <form>
                    <div id="name-input">
                        <label className="form-labels" htmlFor="name">Poll Name</label>
                        <input type="text" name="name" id="name" placeholder="Name" />
                    </div>
                    <div id="address-input">
                        <label className="form-labels" htmlFor="address">Address</label>
                        <input type="text" name="address" id="address" placeholder="Address" />
                    </div>
                    <div>
                        <button type="button" id="begin-button">Begin</button>
                    </div>
                </form>
            </div>
        );
    }
}