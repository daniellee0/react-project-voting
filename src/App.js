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
import SignUpForm from './SignUpForm.js';
import SignOutScreen from './SignOutScreen.js';
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
            currentCounty: ""
        };
    }

  //A callback function for registering new users
  handleSignUp(email, password, handle, avatar) {
    this.setState({errorMessage:null}); //clear any old errors
    firebase.auth().createUserWithEmailAndPassword(email,password)
      .then( (createdUser) => (
        createdUser.user.updateProfile({
          displayName: handle,
          photoURL: avatar
        }).catch( (e) => {
          this.setState({
            errorMessage: e.message
          });
        })
      ).catch( (e) => {
        this.setState({
          errorMessage: e.message
        });
      })
    ).catch( (e) => {
      this.setState({
        errorMessage: e.message
      });
    });
  }

  //A callback function for logging in existing users
  handleSignIn(email, password) {
    this.setState({errorMessage:null}); //clear any old errors
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch( (e) => {
        this.setState({
          errorMessage: e.message
        });
      });
  }

  //A callback function for logging out the current user
  handleSignOut(){
    this.setState({errorMessage:null}); //clear any old errors
    firebase.auth().signOut()
      .catch( (e) => {
        this.setState({
          errorMessage: e.message
        });
    });
  }

  componentDidMount(){

    this.authUnRegFunc = firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.setState({
          user: user,
          loading: false
        })
      } else {
        this.setState({
          user: null
        })
      }
    }); 

  }

  componentWillUnmount(){
    this.authUnRegFunc();
  }


    // Takes in county name parameter to change the state county
    chooseCounty(countyName) {
        this.setState({currentCounty: countyName});
    }
    
    // Renders the HomePage component. Contains the Header, Introduction, Start Form, Main feedback form, Analytics
    // Section, and footer. 
    render() {

    if (this.state.loading == true){
        return <div className="text-center">
                    <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
                </div>;
    }
    let content=null; //content to render

    if(!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
          <SignUpForm 
            signUpCallback={(e,p,h,a) => this.handleSignUp(e,p,h,a)} 
            signInCallback={(e,p) => this.handleSignIn(e,p)} 
            />
        </div>
      );
    } 
    else { //if logged in, show welcome message
      content = (
        <div>
            <div id="main">
                <Header />
                <Introduction />
                <Start county={this.state.currentCounty} adoptCallback={ (countyName) => this.chooseCounty(countyName)}/>
                <Form />
                <Analytics county={this.state.currentCounty}/>
                <Footer />
            </div>
        </div>
      );
    }

        return (
            // Returns components of main
            <div>
                {content}
            </div>
        );
    }
}



