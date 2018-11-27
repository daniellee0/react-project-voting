import React, { Component } from 'react';
import { Card, CardText, CardBody } from 'reactstrap';

export default class Introduction extends Component {
    render() {
        return (
            <div id="intro">
                <div>
                    <h2>Introducing the voter turnout and review platform</h2>
                    <p>Leave a review, digest analytics, and see what others have to say.</p>
                </div>
                <div className="card-container">
                    <div className="cards">
                        {/* Card should be another component */}
                        <div>
                            <i className="fas fa-pencil-alt fa-3x"></i>
                            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div>
                            <i className="far fa-chart-bar fa-3x"></i>                    
                            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                        <div>
                            <i className="fas fa-users fa-3x"></i>
                            <p>Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        </div>
                    </div>
                </div>
                <Card>
                    <i className="fas fa-pencil-alt fa-3x"></i>
                    <CardBody>
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

// class InfoCard extends Component {

// }