import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';

import Header from '../About/Header';
import Footer from '../About/Footer';
import About from '../About/About';


import './SignUpForm.css'; //load module CSS

class SignUpForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined
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

  //update state for specific field
  handleChange(event) {
    let field = event.target.name; //which input
    let value = event.target.value; //what value

    let changes = {}; //object to hold changes
    changes[field] = value; //change this field
    this.setState(changes); //update state
  }

  //handle signUp button
  handleSignUpButton(event) {
    event.preventDefault(); //don't submit
    this.handleSignUp(this.state.email, this.state.password);
  }

  //handle signIn button
  handleSignInButton(event) {
    event.preventDefault(); //don't submit
    this.handleSignIn(this.state.email, this.state.password);
  }

  render() {
    
    let content = null;

    if(!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
          {this.state.errorMessage &&
              <p className="alert alert-danger">{this.state.errorMessage}</p>
          }
          <div className="container" id="sign-in">
          <div className="flex-container">
            <h1>Sign Up</h1>
            <form>
              {/* email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input className="form-control"
                  id="email"
                  type="email"
                  name="email"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              
              {/* password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input className="form-control"
                  id="password"
                  type="password"
                  name="password"
                  onChange={(e) => this.handleChange(e)}
                />
              </div>
              
              {/* buttons */}
              <div className="form-group">
                <button className="btn btn-primary mr-2"
                  onClick={(e) => this.handleSignUpButton(e)}
                  >
                  Sign-up
                </button>
                  <button className="btn btn-primary"
                  onClick={(e) => this.handleSignInButton(e)}
                  >
                  Sign-in
                </button>
              </div>
            </form>
          </div>
          </div>
      </div>
      );
      } 
      else { //if logged in, show welcome message
        content = (
          <div id="main">
            <Header />
            <About />
            <Footer />
          </div>
        );
      }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default SignUpForm