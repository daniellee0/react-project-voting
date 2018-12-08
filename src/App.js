import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import {} from './components/style.css';
import 'react-rangeslider/lib/index.css';


import React, { Component } from 'react';
import Header from './components/About/Header';
import Footer from './components/About/Footer';
import { BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import About from './components/About/About';
import Justices from './components/Justices/Justices'
import VoteFeedback from './components/VoterFeedback/VoteFeedback'
import SignUpForm from './components/signup/SignUpForm';
import SignOutScreen from './components/signup/SignOutScreen';

// Component App that represents the main application and routes to the homepage and about page
// depending on what the user chooses in the navigation bar. Defaults to the home page
export default class App extends Component {
    // Renders the App component
    render() {
        return (
            <Router basename={process.env.PUBLIC_URL+'/'}>
                <Switch>
                    <Route exact path='/home' component={HomePage} />
                    <Route exact path='/justices' render={(props) => {
                        return <Justices {...props} courtData={this.props.courtData}/>
                    }}/>
                    <Route exact path='/votefeedback' component={VoteFeedback} />
                    <Route exact path='/signin' component={SignUpForm} />
                    <Route exact path='/signout' component={SignOutScreen} />
                    <Redirect to='/home' />
                </Switch>
            </Router>
        );
    }
}

// Main page for app
class HomePage extends Component {

    // Renders the HomePage component. Contains the Header, About and footer. 
    render() {
        return (
            <div id="main">
                <Header />
                <About />
                <Footer />
            </div>
        );
    }
}



