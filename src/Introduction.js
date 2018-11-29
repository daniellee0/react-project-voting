import React, { Component } from 'react';

export default class Introduction extends Component {
    render() {
        return (
            <div id="introduction" className="content-container">
                <div>
                    <h2>Introducing the voter turnout and review platform</h2>
                    <p>Leave a review, digest analytics, and see what others have to say.</p>
                </div>
                <div className="card-container">
                    <div className="cards">
                        {/* Card should be another component */}
                        <div>
                            <i className="fas fa-pencil-alt fa-3x"></i>
                            <p>Take the time to leave a meaningful review about your voting experience. Whether you're on the go, or at home, MyVote provides you with access anywhere and everywhere.</p>
                        </div>
                        <div>
                            <i className="far fa-user fa-3x"></i>                    
                            <p>Review analytics about voter satisfaction in your local/national area. Government entities can utilize this data to develop comprehensive solutions in regard to voting.</p>
                        </div>
                        <div>
                            <i className="fas fa-chart-bar fa-3x"></i>
                            <p>Analyze Washington State voter registration and turnout data through an interactive map. Filter by year and age to see how the data changes.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
