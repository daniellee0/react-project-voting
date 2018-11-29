import React, { Component } from 'react';
import * as Papa from 'papaparse';
import Chart from './Chart';

// Component representing the container for all charts to render
export default class Charts extends Component {
    // Takes in a county prop representing the county the user has chosen.
    constructor(props) {
        super(props);
        this.state = {
            allFeedback: [],
            overallSatisfaction: [],
            charts: [],
            questionNames: [],
        };
    }

    // Processes the data and returns an array representing the total response feedback
    // for each unique location    
    processResponses(data) {
        let results = [];
        data.data.forEach( (entry) => {
            let contains = false;
            results.forEach( (location) => {
                // If the county exists in the results, increment responses
                if (location.County === entry.County) {
                    location.Overall_Experience[parseInt(entry.Overall_Experience)-1]++;
                    location.Convenience[parseInt(entry.Convenience)-1]++;
                    location.Timely_Ballot[parseInt(entry.Timely_Ballot)-1]++;
                    location.Online_Voting[parseInt(entry.Online_Voting)-1]++;
                    location.Timeframe[parseInt(entry.Timeframe)-1]++;
                    location.Resources[parseInt(entry.Resources)-1]++;
                    location.Comments.push(entry.Comments);
                    contains = true;
                }
            });
            // If the given county doesn't exist in results create new entry
            if (contains === false) {
                let newLocation = {County: entry.County, 
                    Overall_Experience: [0, 0, 0, 0, 0],
                    Convenience: [0, 0, 0, 0, 0],
                    Timely_Ballot: [0, 0, 0, 0, 0],
                    Online_Voting: [0, 0, 0, 0, 0],
                    Timeframe: [0, 0, 0, 0, 0],
                    Resources: [0, 0, 0, 0, 0],
                    Comments: []
                };
                newLocation.Overall_Experience[parseInt(entry.Overall_Experience)-1]++;
                newLocation.Convenience[parseInt(entry.Convenience)-1]++;
                newLocation.Timely_Ballot[parseInt(entry.Timely_Ballot)-1]++;
                newLocation.Online_Voting[parseInt(entry.Online_Voting)-1]++;
                newLocation.Timeframe[parseInt(entry.Timeframe)-1]++;
                newLocation.Resources[parseInt(entry.Resources)-1]++;
                newLocation.Comments.push(entry.Comments);
                results.push(newLocation);
            }
        });
        return results;
    }
    // Takes a data array and obtains and returns an array representing the total 
    // feedback for every polling location in the data
    getTotalResponse(data) {
        let results = [1, 1, 1, 1, 1];
        for (let i=0; i<data.length; i++) {
            for (let j=0; j<5; j++) {
                results[j] += data[i].Overall_Experience[j]
            }
        }
        return results;
    }

    // Takes a data array and name representing the name of the polling location 
    // and returns an index corresponding to that name in the data.
    getLocationIndex(name) {
        for (let i=0; i<this.state.allFeedback.length; i++) {
            let dataUpper = (this.state.allFeedback[i].County).toUpperCase();
            let nameUpper = (name).toUpperCase();
            if (dataUpper === nameUpper) {
                return i;
            }
        }
        return -1;
    }

    // Fetches data and sets the state to the data from the csv file once the component is mounted.
    componentDidMount() {
        let chartDataCopy = this.state;
        // Start fetch
        fetch('data/voter-feedback.csv')
        // Process the response and return the stream
        .then(response => {
            let reader = response.body.getReader();
            return new ReadableStream({
                start(controller) {
                  return pump();
                  function pump() {
                    return reader.read().then(({ done, value }) => {
                      // When no more data needs to be consumed, close the stream
                      if (done) {
                          controller.close();
                          return;
                      }
                      // Enqueue the next data chunk into our target stream
                      controller.enqueue(value);
                      return pump();
                    });
                  }
                }  
              })
            })
        // Converts to new Response object
        .then(stream => new Response(stream))
        // Converts to blob
        .then(response => response.blob())
        // Sets all feedback, overallSatisfaction, charts, and questionNames state
        .then(blob => {
            let results = "";
            let responses = [];
            let totalResponses = [];
            var reader = new FileReader();
            reader.onload = () => {
                results = reader.result;
                responses = this.processResponses(Papa.parse(results, {header: true}));
                totalResponses = this.getTotalResponse(responses);
                chartDataCopy.allFeedback = responses;
                let qNames = Object.keys(this.state.allFeedback[0]); 
                chartDataCopy.questionNames = qNames;
                chartDataCopy.overallSatisfaction = totalResponses;
                chartDataCopy.charts.push({data: totalResponses, text: 'Overall Satisfaction'});
                this.setState(chartDataCopy);
            };
            reader.readAsText(blob);
            return responses;
        })
        .catch(error => console.log(error))
    }

    // Replaces the previous state with 3 new charts of the given county once the component updates (county passed)
    componentDidUpdate(prevProps) {
        let chartDataCopy = this.state;
        if (this.props.county !== prevProps.county && this.props.county !== "") {
            let locationIndex = this.getLocationIndex(this.props.county);
            let qNames = Object.keys(this.state.allFeedback[locationIndex]); 
            chartDataCopy.overallSatisfaction = this.state.allFeedback[locationIndex][qNames[1]];
            chartDataCopy.charts[0] = {data: this.state.allFeedback[locationIndex][qNames[1]], text: qNames[1].replace('_', ' ')};
            chartDataCopy.charts[1] = {data: this.state.allFeedback[locationIndex][qNames[2]], text: qNames[2].replace('_', ' ')};
            chartDataCopy.charts[2] = {data: this.state.allFeedback[locationIndex][qNames[3]], text: qNames[3].replace('_', ' ')};
            this.setState(chartDataCopy);
        }
    }
    
    // Removes chart
    removeChart(chartIndex) {
        let chartDataCopy = this.state;
        chartDataCopy.charts.splice(chartIndex, 1);
        this.setState(chartDataCopy);
    }

    // Updates chart
    updateChart(chart, question) {
        let chartDataCopy = this.state;  
        chartDataCopy.charts[chart] = {data: this.state.allFeedback[this.getLocationIndex(this.props.county)][this.state.questionNames[this.state.questionNames.indexOf(question)]], text: this.state.questionNames[this.state.questionNames.indexOf(question)].replace('_', ' ')};
        this.setState(chartDataCopy);    
    }


    render() {
        // Options representing the drop down menu the user can choose to display data
        let options = [];
        if (this.props.county.length) {
            for (let j=1; j<7; j++) {
                if (j === 1) {
                    options[j - 1] = <option key={j} value={this.state.questionNames[j]}>{this.state.questionNames[j].replace('_', ' ')}</option>
                }
                options[j - 1] = <option key={j} value={this.state.questionNames[j]}>{this.state.questionNames[j].replace('_', ' ')}</option>
            }
        }

        // Represents charts that will be displayed to the user. Contains a button that the user can use to delete the chart. 
        let charts = this.state.charts.map( (chart) => {
            return (
                <div className="chart" key={this.state.charts.indexOf(chart)}>
                    <div>
                        {this.props.county.length > 0 ? <select value={chart.text.replace(' ', '_')} onChange={ (event) => {
                            this.updateChart(this.state.charts.indexOf(chart), event.target.value)
                        }}>{options}</select> : <div></div>}
                    </div>
                    {this.props.county.length > 0 ? <div className="input-group-append">
                        <button type="button" className="btn btn-danger" onClick={ () => this.removeChart(this.state.charts.indexOf(chart))}>
                            <span className="fa fa-times" aria-label="remove"></span>
                        </button>
                    </div> : <div></div>}
                    <Chart chartData={[chart.data]} text={chart.text} />
                </div>);
        });
        
        let stateCopy = this.state;
        // Returns the charts to be displayed on the application. When the user presses the add chart button, a new 
        // chart is rendered. Add chart is only displayed when the user has inputted a county.
        return (
            <div id="charts">
                <div id="charts-header">
                {this.props.county.length > 0 ? <button id="add-chart" onClick={ () => {
                        stateCopy.charts.push({data: this.state.overallSatisfaction, text: 'Overall Experience'});
                        this.setState(stateCopy);
                    }}>Add Chart</button>
                    : <div></div>}
                </div>
                <div id="charts-container">
                    {this.state.charts.length > 0 ? charts : <div></div>}
                </div> 
            </div>
        );
    }
}
