import React, { Component } from 'react';
import firebase from 'firebase/app';
import JusticeCard from './JusticeCard';
import { Grid, Row } from 'react-bootstrap';
import { HashLink as Link } from 'react-router-hash-link';

// Component that represents the user picking a particular justice. Users can compare justices be selecting them.
export default class PickJustice extends Component {
    //Takes in scores.csv as a prop and creates a state to keep track of the justices 
    //selected and their keys in Firebase
    constructor(props) {
        super(props)

        this.state = {
            value: [],
            keys: {}
        }
    }

    //Sets the data from Firebase in the state when the page loads
    componentDidMount() {
        let stateCopy = this.state;
        this.justiceRef = firebase.database().ref("Justices")
        this.justiceRef.on("value", (snapshot) => {
            if (snapshot.val() != null) {
                this.setState({ value: Object.values(snapshot.val()) });
                for (var i = 0; i < Object.values(snapshot.val()).length; i++) {
                    let name = Object.values(snapshot.val())[i]
                    let key = Object.keys(snapshot.val())[i]
                    stateCopy.keys[name] = key
                }
            }
        });
        this.setState(stateCopy);
    }

    // When the component unmounts, remove the reference. 
    componentWillUnmount() {
        this.justiceRef.off();
    }

    //Creates an array of all the justice names in the time period
    justiceNames = () => {
        let justiceNames = [];
        for (var i = 0; i < this.props.courtData.length - 1; i++) {
            let justice = this.props.courtData[i].justice_name
            if (!justiceNames.includes(justice)) {
                justiceNames.push(justice);
            }
        }
        return justiceNames
    }

    //Creates the check boxes and their functionality
    checkbox = () => {
        return this.justiceNames().map( (name) => {
            return (
                <label className="checkbox-inline" key={name}><input type="checkbox" value={name} 
                                checked={this.state.value.includes(name)} onChange={ () => {
                    let ref = firebase.database().ref("Justices");
                    let stateCopy = this.state;
                    //Adds and removes the name from Firebase (and updates state)
                    if (this.state.value.includes(name)) {
                        let indexState = this.state.value.indexOf(name);
                        this.state.value.splice(indexState, 1)

                        //Finds the key in Firebase for the name
                        let key;
                        Object.keys(this.state.keys).forEach( (justiceName) => {
                            if (justiceName === name) {
                                key = this.state.keys[name]
                            }
                        })
                        
                        //Removes the key from state
                        for (var i = 0; i < Object.keys(this.state.keys).length; i++) {
                            if (Object.keys(this.state.keys)[i] === name) {
                                delete this.state.keys[name]
                            }
                        }

                        //Removes the name from Firebase
                        if (key.key === undefined) {
                            ref.child(key).remove()
                        } else {
                            ref.child(key.key).remove()
                        }

                    } else {
                        //Adds the name to Firebase if it wasn't already there
                        this.state.value.push( name);
                        let key = ref.push(name).key;
                        stateCopy.keys[name] = {key};
                        this.setState(stateCopy);
                    }
                    
                    //Re-renders the application to show updated charts
                    this.forceUpdate()
                }}/>{name} &nbsp;&nbsp;&nbsp;</label>
            )
        })
    }

    //Creates a chart for evey name that is stored in the state's value prop
    displayCharts = () => {
        return this.state.value.map( (name) => 
            <JusticeCard key={name} color={"#eaedf2"} data={this.props.courtData.filter( (obj) => obj.justice_name === name)} />
        )
    }

    loggedIn = () => {
        let user = firebase.auth().currentUser;
        if (user) {
            return (
                <div>
                    {this.checkbox()}
                    <Grid>
                        <Row>
                            {this.displayCharts()}
                        </Row>
                    </Grid>
                </div>
            )
        } else {
            return (
                <div>
                    <p>In order to see and use this function you must be logged in.</p>
                    <Link to="/signin"><button className="login-button">Login</button></Link>
                </div>
            )
        }
    }

    render() {
        return (
            <div>
                <h2>Justices 1937 - 2015</h2>
                <p>
                    Look up justices you know and like. Research new ones. Compare justices. Click on whichever 
                    justice you desire to see how their ideology has shifted over time! 
                </p>
                {this.loggedIn()}
            </div>
        )
    }
}