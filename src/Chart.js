import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';

// Component representing a single chart
export default class Chart extends Component {
    // Takes a chartData prop representing data and text prop representing the "title" of the chart
    constructor(props) {
        super(props);
        this.state = 
            {chartData: this.props.chartData,
             text: this.props.text};
    }

    // Sets data and text of the chart when it receives new props
    componentWillReceiveProps(nextProps) {
        this.setState({chartData: nextProps.chartData,
            text: nextProps.text});  
    }

    // Returns a single chart
    render() {
        return (
            <Pie
                data = {{
                    labels: ["Very Poor", "Poor", "Fair", "Good", "Very Good"],
                    datasets: [{
                        backgroundColor: ['#FC8F6E', '#D7A44A', '#9DB756', '#5EC087', '#3EBEBF'],
                        data: this.state.chartData[0]
                    }]
                }}

                options = {{
                    title: {
                        display: true,
                        text: this.state.text,
                        fontSize: 20
                    },
            
                    animation: {
                        animateScale: true,
                        duration: 1000,
                    },
                    legend: {
                        display: false
                    },
            
                }}
                width={300} height={300} 
            />
        )
    }
}