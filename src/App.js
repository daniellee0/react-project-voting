import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import {} from './style.css';

import React, { Component } from 'react';
import Header from './Header';
import Introduction from './Introduction';
import Description from './Description';
import Start from './Start';
import Form from './Form';
import Analytics from './Analytics';
import Footer from './Footer';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import About from './About';


export default class App extends Component {

    render() {
        return (
            <Router basename={process.env.PUBLIC_URL+'/'}>
                <div>
                    <Switch>
                        <Route exact path='/home' component={HomePage} />
                        <Route path='/about' component={About} />
                        <Route component={HomePage} /> 
                    </Switch>
                </div>
            </Router>
        );
    }
}

class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // charts: [],
            currentCounty: ""
        };
    }

    chooseCounty(countyName) {
        this.setState({currentCounty: countyName});
    }
    
    render() {
        return (
            <div id="main">
                <Header />
                <Introduction />
                <Description />
                <Start county={this.state.currentCounty} adoptCallback={ (countyName) => this.chooseCounty(countyName)}/>
                <Form />
                <Analytics county={this.state.currentCounty}/>
                <Footer />
            </div>
        );
    }
}



