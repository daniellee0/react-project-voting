import React, { Component } from 'react';
import {Pie} from 'react-chartjs-2';


export default class Chart extends Component {
    constructor(props) {
        super(props);
        this.state = 
            {chartData: this.props.chartData,
             text: this.props.text};
    }

    componentWillReceiveProps(nextProps) {
        this.setState({chartData: nextProps.chartData,
            text: nextProps.text});  
    }

    render() {
        return (
            
                <Pie
                    // data={this.state.chartData}
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