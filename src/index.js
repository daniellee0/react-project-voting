import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Papa from 'papaparse';
import {BrowserRouter} from "react-router-dom";

//Firbase imports and configuration
import firebase from 'firebase/app';
import 'firebase/auth'; 
import 'firebase/database'

var config = {
    apiKey: "AIzaSyDDz3LXrgrWvk2gYRXNqpC_hXwcj67q9os",
    authDomain: "votefact-806f4.firebaseapp.com",
    databaseURL: "https://votefact-806f4.firebaseio.com",
    projectId: "votefact-806f4",
    storageBucket: "votefact-806f4.appspot.com",
    messagingSenderId: "128219094427"
  };
  firebase.initializeApp(config);

Papa.parse(require('../src/data/scores.csv'), {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: (results) => {
        ReactDOM.render(<BrowserRouter><App courtData={results.data}/></BrowserRouter>, document.getElementById('root'))
    }
  });

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();