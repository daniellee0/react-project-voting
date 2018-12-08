import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';

//Component that creates the slider and timeline of change in ideology
export default class JusticeTimeline extends Component {
    //Takes in scores.csv as a prop
    constructor(props, context) {
      super(props, context)
      this.state = {
        value: 1960,
        courtData: this.props.courtData.filter( (obj) => {
            return obj.court_term >= 1937 && obj.court_term <= 1960;
        })
      }
    }
    
    //Sets the state when the slider is changed to update the value of the slider
    handleOnChange = (event) => {
        this.setState({
            value: event.target.value, 
            courtData: this.props.courtData.filter( (obj) => {
                return obj.court_term >= 1937 && obj.court_term <= this.state.value;
            })
        });
    }
   
    render() {
      return (
          <div>
            <p id="alert" className="mobile">
                Tilt your mobile device horizontally to make the timeline and graph show up better.
            </p>
            <h2>Timeline of Ideology</h2>
            <h4>1937 - {this.state.value}</h4>

            {/* This renders the slider */}
            <input type="range" min="1937" max="2015" step="1" defaultValue={this.state.value} onChange={this.handleOnChange} className="slider"></input>
            
            <br/> 
            <br/>
            <br/>
            <CreateTimeline courtData={this.state.courtData} />
          </div>
      )
    }
  }

  //Component that creates the timeline based on the value in the slider
  export class CreateTimeline extends Component {
    //Creates an array of objects that is used as the dataset for the timeline
    createGraph = () => {
        //Hardcode an array of colors used for the timeline
        var colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
        '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
        '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
        '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
        '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
        '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
        '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
        '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
        '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
        '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'];

        let dataArray = [];

        //Creates an array of all the justice names in the time period
        let justiceNames = [];
        for (var i = 0; i < this.props.courtData.length; i++) {
            let justice = this.props.courtData[i].justice_name
            if (!justiceNames.includes(justice)) {
                justiceNames.push(justice);
            }
        }

        //Loops through the dataset to create an array of objects (one object for each justice)
        for (var j = 0; j < justiceNames.length; j++) {
            //Filters the dataset for the particular justice name
            let justiceFilter = this.getJusticeName(j, justiceNames);

            //Gets an array of all the posterior means (ideology scores) for that justice
            let posteriorMeans = [];
            for (var k = 0; k < justiceFilter.length; k++) {
                let obj = {};
                obj.x = justiceFilter[k].court_term;
                obj.y = justiceFilter[k].posterior_mean;
                posteriorMeans.push(obj);
            }
            dataArray.push(createData(posteriorMeans, justiceFilter[0].justice_name, colorArray[j]));
        }
        
        //Creates an object with a label of the justice name and data of the posterior means
        function createData(posteriorMeans, name, color) {
            return {"label" : name, "data" : posteriorMeans, "borderColor" : color, "borderWidth" : 3, "fill" : false};
        }

        return dataArray;
    }

    getJusticeName(index, justiceNames) {
        let justiceFilter = this.props.courtData.filter( (obj) => {
            return obj.justice_name === justiceNames[index]}
        );
        return justiceFilter;
    }

    //Creates an array of the court terms (this is used for the x-axis labels)
    createLabels = () => {
        let labels = []

        for (var i = 0; i < this.props.courtData.length; i++) {
            if (!labels.includes(this.props.courtData[i].court_term)) {
                labels.push(this.props.courtData[i].court_term);
            }
        }

        return labels;
    }


    render() {
        return(
            //Creates the timeline
            <Line
                data={{
                    datasets: this.createGraph(),
                    labels: this.createLabels()
                }}
                height={300}
                width={500}
                options={{
                    maintainAspectRatio: true,
                    responsive: true,
                    title: {
                        display: false,
                    },
                    legend: {
                        display: true,
                        position: "top"
                    }
                }}
            />
        )
    }
  }