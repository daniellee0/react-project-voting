import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';

//Component that represents a single justice card within a grid
export default class JusticeCard extends Component {
    render() {
        return (
            <Col sm={12} md={6}>
                <h3 id="h3">{this.props.data[0].justice_name}</h3>

                {/* Makes the line graph */}
                <Line
                    data={{
                        labels: this.props.data.map( (obj) => obj.court_term),
                        datasets: [{
                            label: "Posterior Mean",
                            data: this.props.data.map( (obj) => obj.posterior_mean),
                            borderWidth: 3,
                            borderColor: "gray",
                            backgroundColor: this.props.color
                        }]}}
                    height={300}
                    width={500}
                    options={{
                        maintainAspectRatio: true,
                        responsive: true,
                        title: {
                            display: false,
                        },
                        legend: {
                            display: false,
                        }
                    }}
                />
            </Col>
        )
    }
}