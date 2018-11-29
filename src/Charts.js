import React, { Component } from 'react';
import * as Papa from 'papaparse';
import Chart from './Chart';

// Need to put this in the callback function!!!


export default class Charts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Data for charts
        //   charts: []
            allFeedback: [],
            overallSatisfaction: [],
            charts: [],
            questionNames: [],
        };
    }

    // Need to put this in the callback function!!!
    processResponses(data) {
        let results = [];
        data.data.forEach( (entry) => {
            let contains = false;
            results.forEach( (location) => {
                if (location.PollingLocation === entry.PollingLocationName) {
                    location.Overall_Experience[parseInt(entry.Overall_Experience)-1]++;
                    location.Wait_Time[parseInt(entry.Wait_Time)-1]++;
                    location.Registration[parseInt(entry.Registration)-1]++;
                    location.Service[parseInt(entry.Service)-1]++;
                    location.Timeframe[parseInt(entry.Timeframe)-1]++;
                    location.Resources[parseInt(entry.Resources)-1]++;
                    location.Comments.push(entry.Comments);
                    contains = true;
                }
            });
            if (contains === false) {
                let newLocation = {PollingLocation: entry.PollingLocationName, 
                    Overall_Experience: [0, 0, 0, 0, 0],
                    Wait_Time: [0, 0, 0, 0, 0],
                    Registration: [0, 0, 0, 0, 0],
                    Service: [0, 0, 0, 0, 0],
                    Timeframe: [0, 0, 0, 0, 0],
                    Resources: [0, 0, 0, 0, 0],
                    Comments: []
                };
                newLocation.Overall_Experience[parseInt(entry.Overall_Experience)-1]++;
                newLocation.Wait_Time[parseInt(entry.Wait_Time)-1]++;
                newLocation.Registration[parseInt(entry.Registration)-1]++;
                newLocation.Service[parseInt(entry.Service)-1]++;
                newLocation.Timeframe[parseInt(entry.Timeframe)-1]++;
                newLocation.Resources[parseInt(entry.Resources)-1]++;
                newLocation.Comments.push(entry.Comments);
                results.push(newLocation);
                
            }
        });
        return results;
    }

    getTotalResponse(data) {
        let results = [1, 1, 1, 1, 1];
        for (let i=0; i<data.length; i++) {
            for (let j=0; j<5; j++) {
                results[j] += data[i].Overall_Experience[j]
            }
        }
        return results;
    }

    getLocationIndex(name) {
        for (let i=0; i<this.state.allFeedback.length; i++) {
            let dataUpper = (this.state.allFeedback[i].PollingLocation).toUpperCase();
            let nameUpper = (name).toUpperCase();
            if (dataUpper === nameUpper) {
                return i;
            }
        }
        return -1;
    }

    // County is in PROPS USE TO FILTER DATA
    componentDidMount() {
        
        let chartDataCopy = this.state;
        fetch('data/voter-feedback.csv')
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
        .then(stream => new Response(stream))
        .then(response => response.blob())
        .then(blob => {
            let results = "";
            let responses = [];
            let totalResponses = [];
            var reader = new FileReader();
            reader.onload = () => {
                results = reader.result;
                // this.setState(processResponses(Papa.parse(results, {header: true})));
                responses = this.processResponses(Papa.parse(results, {header: true}));
                totalResponses = this.getTotalResponse(responses);
                chartDataCopy.allFeedback = responses;
                let qNames = Object.keys(this.state.allFeedback[0]); 
                chartDataCopy.questionNames = qNames;
                console.log(qNames);
                chartDataCopy.overallSatisfaction = totalResponses;
                chartDataCopy.charts.push({data: totalResponses, text: 'Overall Satisfaction'});
                // chartDataCopy.charts.push({data: totalResponses, text: 'Overall Satisfaction'});
                // chartDataCopy.chartData.datasets[0].data = totalResponses;
                this.setState(chartDataCopy);
            };
            reader.readAsText(blob);
            return responses;
        })
        .catch(error => console.log(error))
    }

    componentDidUpdate(prevProps) {
        let chartDataCopy = this.state;
        if (this.props.county !== prevProps.county && this.props.count !== "") {
            let locationIndex = this.getLocationIndex(this.props.county);
            let qNames = Object.keys(this.state.allFeedback[locationIndex]); 
            chartDataCopy.overallSatisfaction = this.state.allFeedback[locationIndex][qNames[1]];
            chartDataCopy.charts[0] = {data: this.state.allFeedback[locationIndex][qNames[1]], text: qNames[1].replace('_', ' ')};
            chartDataCopy.charts[1] = {data: this.state.allFeedback[locationIndex][qNames[2]], text: qNames[2].replace('_', ' ')};
            chartDataCopy.charts[2] = {data: this.state.allFeedback[locationIndex][qNames[3]], text: qNames[3].replace('_', ' ')};
            this.setState(chartDataCopy);
        }
    }
    
    removeChart(chartIndex) {
        let chartDataCopy = this.state;
        chartDataCopy.charts.splice(chartIndex, 1);
        this.setState(chartDataCopy);
    }

    updateChart(chart, question) {
        let chartDataCopy = this.state;  
        chartDataCopy.charts[chart] = {data: this.state.allFeedback[this.getLocationIndex(this.props.county)][this.state.questionNames[this.state.questionNames.indexOf(question)]], text: this.state.questionNames[this.state.questionNames.indexOf(question)].replace('_', ' ')};
        this.setState(chartDataCopy);    
    }

    render() {
        let options = [];
        if (this.props.county.length) {
            for (let j=1; j<7; j++) {
                if (j === 1) {
                    options[j - 1] = <option key={j} value={this.state.questionNames[j]}>{this.state.questionNames[j].replace('_', ' ')}</option>
                }
                options[j - 1] = <option key={j} value={this.state.questionNames[j]}>{this.state.questionNames[j].replace('_', ' ')}</option>
            }
        }

        let charts = this.state.charts.map( (chart) => {
            return (
                <div key={this.state.charts.indexOf(chart)}>
                    <div>
                        {this.props.county.length > 0 ? <select value={chart.text.replace(' ', '_')} onChange={ (event) => {
                            this.updateChart(this.state.charts.indexOf(chart), event.target.value)
                        }}>{options}</select> : <div></div>}
                    </div>
                    <div className="input-group-append">
                        <button type="button" className="btn btn-danger" onClick={ () => this.removeChart(this.state.charts.indexOf(chart))}>
                        <span className="fa fa-times" aria-label="remove"></span>
                        </button>
                    </div>
                    <Chart chartData={[chart.data]} text={chart.text} />
                </div>);
        });
        
        // render based on whether or not there is a county. maybe wrap the analytics in a separate. setting new county will rerender the charts. 
        let stateCopy = this.state;
        return (
            <div id="charts">
                <div id="charts-header">
                    <button id="add-chart" onClick={ () => {
                        stateCopy.charts.push({data: this.state.overallSatisfaction, text: 'Overall Experience'});
                        this.setState(stateCopy);
                    }}>Add Chart</button>
                </div>
                <div id="charts-container">
                    {/* <div className="chart"> */}
                     {this.state.charts.length > 0 ? charts : <div></div>}
                    {/* </div> */}
                </div> 
            </div>
        );
    }
}
