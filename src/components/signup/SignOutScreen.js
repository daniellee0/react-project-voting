import React, { Component } from 'react'; //import React Component
import firebase from 'firebase/app';

import './SignUpForm.css'; //load module CSS

// Component that represents the signout screen for when the user signs out. 
class SignOutScreen extends Component {
  render() {

    // When authentication changes.
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in. Bring them back to the main page
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
          <p>You will be redirected to the home page in 2 seconds.</p>
      </div>
    )
  }
}

export default SignOutScreen