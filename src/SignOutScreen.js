import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import {Link} from 'react-router-dom';

import './SignUpForm.css'; //load module CSS

class SignOutScreen extends Component {

  render() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.auth().signOut();
        } else {
          // No user is signed in.
        }
      });

    return (
        <div>
            <p>You signed out!</p>
            {/* <Link to='/'>Click here to return to the sign-in screen</Link> */}
        </div>
    )
  }
}

export default SignOutScreen