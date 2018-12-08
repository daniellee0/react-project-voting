import React, { Component } from 'react';
import firebase from 'firebase/app';

// Component reprsenting the different questions and options the user can select to provide feedback
export default class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {leaning: '', satisfaction: '', participation: '', mail: '', online: '', submitted: false};
    }

    //when the text in the form changes
    updateFeedback(value, type) {
        let stateCopy = this.state;
        stateCopy[type] = value;
        this.setState(stateCopy);
    }

    postForm(event){
        event.preventDefault(); //don't submit
        let newFeedback = {
          leaning: this.state.leaning,
          satisfaction: this.state.satisfaction,
          participation: this.state.participation,
          mail: this.state.mail,
          online: this.state.online,
        };
        let user = firebase.auth().currentUser.uid;
        if (user) {  
            // console.log(user);
        }
        this.feedback = firebase.database().ref('feedback').push(newFeedback);
    
        this.setState({leaning: '', satisfaction: '', participation: '', mail: '', online: ''}); //empty out post for next time
    }

    // Renders the Form component. Contains the table that represents the feedback form.
    render() {
        return (
            <div id="form">
                <h2>Feedback Form</h2>
                <p>Anonymously answer the following questions about your voting experience</p>
                <p>Survey Scale: 1=Very Poor, 5=Very Good</p>
                <Table adoptCallback={(value, type) => this.updateFeedback(value, type)}/>
                <div id="submit-feedback">
                    <button onClick={(e) => this.postForm(e)} form="form">Submit</button>
                </div>
            </div>
        );
    }
}

// Table component that represents the main feedback form. Users can choose multiple choice options
// and then submit the form.
class Table extends Component {

    // Renders the main feedback form (Table).
    render() {
        let callBack = this.props.adoptCallback;
        return(
            <table>
                <tbody>
                    <tr>
                        <td>Where do you politically lean?</td>
                        <td>
                            <label htmlFor="democrat">Democrat</label>
                            <input onClick={(e) => callBack(e.target.value, 'leaning')} aria-label="Democrat" type="radio" name="leaning" id="democrat" value="democrat"/>
                            <label htmlFor="republican">Republican</label>
                            <input onClick={(e) => callBack(e.target.value, 'leaning')} aria-label="Republican" type="radio" name="leaning" id="republican" value="republican"/>
                            <label htmlFor="other">Other</label>
                            <input onClick={(e) => callBack(e.target.value, 'leaning')} aria-label="Other" type="radio" name="leaning" id="other" value="other"/>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>How satisfied are you with your overall experience?</td>
                        <td>
                            <label htmlFor="q1-very-poor">1</label>
                            <input onClick={(e) => callBack(e.target.value, 'satisfaction')} aria-label="1" type="radio" name="satisfaction" id="q1-very-poor" value="very-poor"/>
                            <label htmlFor="q1-poor">2</label>
                            <input onClick={(e) => callBack(e.target.value, 'satisfaction')} aria-label="2" type="radio" name="satisfaction" id="q1-poor" value="poor"/>
                            <label htmlFor="q1-fair">3</label>
                            <input onClick={(e) => callBack(e.target.value, 'satisfaction')} aria-label="3" type="radio" name="satisfaction" id="q1-fair" value="fair"/>
                            <label htmlFor="q1-good">4</label>
                            <input onClick={(e) => callBack(e.target.value, 'satisfaction')} aria-label="4" type="radio" name="satisfaction" id="q1-good" value="good"/>
                            <label htmlFor="q1-very-good">5</label>
                            <input onClick={(e) => callBack(e.target.value, 'satisfaction')} aria-label="5" type="radio" name="satisfaction" id="q1-very-good" value="very-good"/>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Did you participate in the most recent midterm election? (2018)</td>
                        <td>
                            <label htmlFor="participateYes">Yes</label>
                            <input onClick={(e) => callBack(e.target.value, 'participation')} aria-label="yes" type="radio" name="participation" id="participateYes" value="yes"/>
                            <label htmlFor="participateNo">No</label>
                            <input onClick={(e) => callBack(e.target.value, 'participation')} aria-label="no" type="radio" name="participation" id="participateNo" value="no"/>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>How would you rate the convenience of voting by mail?</td>
                        <td>
                            <label htmlFor="q2-very-poor">1</label>
                            <input onClick={(e) => callBack(e.target.value, 'mail')} aria-label="1" type="radio" name="mail" id="q2-very-poor" value="very-poor"/>
                            <label htmlFor="q2-poor">2</label>
                            <input onClick={(e) => callBack(e.target.value, 'mail')} aria-label="2" type="radio" name="mail" id="q2-poor" value="poor"/>
                            <label htmlFor="q2-fair">3</label>
                            <input onClick={(e) => callBack(e.target.value, 'mail')} aria-label="3" type="radio" name="mail" id="q2-fair" value="fair"/>
                            <label htmlFor="q2-good">4</label>
                            <input onClick={(e) => callBack(e.target.value, 'mail')} aria-label="4" type="radio" name="mail" id="q2-good" value="good"/>
                            <label htmlFor="q2-very-good">5</label>
                            <input onClick={(e) => callBack(e.target.value, 'mail')} aria-label="5" type="radio" name="mail" id="q2-very-good" value="very-good"/>
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Would you prefer online voting if it was available?</td>
                        <td>
                            <label htmlFor="onlineYes">Yes</label>
                            <input onClick={(e) => callBack(e.target.value, 'online')} aria-label="yes" type="radio" name="online" id="onlineYes" value="yes"/>
                            <label htmlFor="participateNo">No</label>
                            <input onClick={(e) => callBack(e.target.value, 'online')} aria-label="no" type="radio" name="online" id="onlineNo" value="no"/>
                        </td>
                    </tr>
                </tbody>
            </table>
            
        );
    }
}


