import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import {} from './components/style.css';
import 'react-rangeslider/lib/index.css';


import React, { Component } from 'react';
import Header from './components/About/Header';
import Footer from './components/About/Footer';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './components/About/About';
import Justices from './components/Justices/Justices'
import VoteFeedback from './components/VoterFeedback/VoteFeedback'
import SignUpForm from './components/signup/SignUpForm';
import SignOutScreen from './components/signup/SignOutScreen';
import firebase from 'firebase/app';

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
                        <Route path='/votefeedback' component={VoteFeedback} />
                        <Route path='/signin' component={SignUpForm} />
                        <Route path='/signout' component={SignOutScreen} />
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
            
        };
    }

    // Renders the HomePage component. Contains the Header, About and footer. 
    render() {

        return (
            <div>
                <div id="main">
                    <Header />
                    <About />
                    <Footer />
                </div>
            </div>
        );
    }
}



