import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import {} from './style.css';
import 'react-rangeslider/lib/index.css';


import React, { Component } from 'react';
import Header from './Header';
import Introduction from './Introduction';
import Start from './Start';
import Form from './Form';
import Analytics from './Analytics';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './About';
import Justices from './Justices'

// Component App that represents the main application and routes to the homepage and about page
// depending on what the user chooses in the navigation bar. Defaults to the home page
export default class App extends Component {
    // Renders the App component
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL+'/'}>
                <div>
                    <Switch>
                        <Route exact path='/home' component={HomePage} />
                        <Route path='/about' component={About} />
                        <Route path='/justices' render={(props) => {
                            return <Justices {...props} courtData={this.props.courtData}/>
                        }}/>
                        <Route component={HomePage} /> 
                    </Switch>
                </div>
            </Router>
        );
    }
}

// Main page for app
class HomePage extends Component {

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
    
    // Renders the HomePage component. Contains the Header, Introduction, Start Form, Main feedback form, Analytics
    // Section, and footer. 
    render() {
        return (
            // Returns components of main
            <div id="main">
                <Header />
                <Introduction />
                <Start county={this.state.currentCounty} adoptCallback={ (countyName) => this.chooseCounty(countyName)}/>
                <Form />
                <Analytics county={this.state.currentCounty}/>
                <Footer />
            </div>
        );
    }
}



