import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';
import {Link} from 'react-router-dom';

import './SignUpForm.css'; //load module CSS

class SignOutScreen extends Component {

  render() {

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
          firebase.auth().signOut().then(() => {
            window.setTimeout(() => {
              window.location.href = "/"
            }, 2000);
          })
        } else {
          // No user is signed in.
        }
      });

    return (
        <div>
            <h1>You have signed out</h1>
            <p>You will be redirected to the sign-in page in 2 seconds.</p>
        </div>
    )
  }
}

export default SignOutScreen