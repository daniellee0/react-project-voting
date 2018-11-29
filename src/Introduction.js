import React, { Component } from 'react';

// Component representing the Introduction that contains information about the application and some contextual information
export default class Introduction extends Component {
    // Renders the Introduction component that contains description information and info cards.
    render() {
        return (
            <div id="introduction" className="content-container">
                <div>
                    <h2>Introducing the voter turnout and review platform for Washingtonians</h2>
                    <p>Leave a review, digest analytics, and see what others have to say.</p>
                    Many voters struggle with recognizing the value of their vote. A common sentiment is
                    "How does my one vote matter?". While it may not seem like your individual vote can make the 
                    difference, if everyone shared that sentiment, then it truly wouldn't matter! Additionally, 
                    with races sometimes coming down right to the line, a few votes can make all the difference.
                    Senator Bernie Sanders once won a mayoral election by a margin of just <a href="https://en.wikipedia.org/wiki/Burlington_mayoral_election,_1981">10 votes
                    </a>. 
                </div>
                <div className="card-container">
                    <Cards />
                </div>
            </div>
        );
    }
}

// Cards component that represents the information cards that represent information about what the application does
// and can do.
class Cards extends Component {
    // Renders the Cards component.
    render() {
        return (
            <div className="cards">
                <div>
                    <i className="fas fa-pencil-alt fa-3x"></i>
                    <p>Take the time to leave a meaningful review about your voting experience. Whether you're on the go, or at home, VoteFact provides you with access anywhere and everywhere.</p>
                </div>
                <div>
                    <i className="far fa-user fa-3x"></i>                    
                    <p>Review analytics about voter satisfaction in your local county. Government entities can utilize this data to develop comprehensive solutions in regard to voting.</p>
                </div>
                <div>
                    <i className="fas fa-chart-bar fa-3x"></i>
                    <p>Analyze Washington State voter registration and turnout data through an interactive map. Filter by year and age to see how the data changes.</p>
                </div>
            </div>
        );
    }
}
