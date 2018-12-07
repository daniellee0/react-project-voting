import React, { Component } from 'react';
import NavbarFeatures from '../About/Navbar';
import Start from './Start';
import Form from './Form';
import Analytics from './Analytics';
import Footer from '../About/Footer';



export default class VoteFeedback extends Component {


    // County state is used to share the county state between the Start component and the Analytics component
    // in order to render the chart. 
    constructor(props) {
        super(props);
        this.state = {
            currentCounty: ""
        };
    }

    // Takes in county name parameter to change the state county
    chooseCounty(countyName) {
        this.setState({currentCounty: countyName});
    }


    render() {
        return (
            <div>
                <NavbarFeatures dark={false} light={true} />
                <Start county={this.state.currentCounty} adoptCallback={ (countyName) => this.chooseCounty(countyName)}/>
                <Form />
                <Analytics county={this.state.currentCounty}/>
                <Footer />
            </div>
        );
    }
}