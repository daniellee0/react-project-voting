import React, { Component } from 'react';
import firebase from 'firebase/app';
import Chart from './Chart';

// Component representing the container for all charts to render
export default class Charts extends Component {
    // Takes in a county prop representing the county the user has chosen.
    constructor(props) {
        super(props);
        this.state = {
            allFeedback: {},
            overallSatisfaction: [],
            charts: [],
            questionNames: [],
            textNames: []
        };
    }

    // Processes the data and returns an array representing the total response feedback
    // for each unique location    
    processResponses(data) {
        let results = {leaning: [0, 0], satisfaction: [0 ,0 ,0 ,0 ,0], 
                       participation: [0, 0], mail: [0 ,0 ,0 ,0 ,0], 
                       online: [0, 0]};
        data.forEach( (entry) => {
            if (entry.leaning === 'democrat') {
                results.leaning[0]++;               // 0 = democrat
            } else {        
                results.leaning[1]++;               // 1 = republican
            }

            if (entry.satisfaction === 'very-poor') {
                results.satisfaction[0]++;
            } else if (entry.satisfaction === 'poor') {
                results.satisfaction[1]++;
            } else if (entry.satisfaction === 'fair') {
                results.satisfaction[2]++;
            } else if (entry.satisfaction === 'good') {
                results.satisfaction[3]++;
            } else {
                results.satisfaction[4]++;
            }

            if (entry.participation === 'no') {
                results.participation[0]++;         // 0 = no
            } else {
                results.participation[1]++;         // 1 = yes
            }

            if (entry.mail === 'very-poor') {
                results.mail[0]++;
            } else if (entry.mail === 'poor') {
                results.mail[1]++;
            } else if (entry.mail === 'fair') {
                results.mail[2]++;
            } else if (entry.mail === 'good') {
                results.mail[3]++;
            } else {
                results.mail[4]++;
            }

            if (entry.online === 'yes') {
                results.online[1]++;                   // 1 = yes
            } else {
                results.online[0]++;                   // 0 = no
            }
        });
        return results;
    }

    // Takes a data array and obtains and returns an array representing the total 
    // feedback for every polling location in the data
    getOverallSatisfaction(data) {
        let results = [0, 0, 0, 0, 0];
        for (let i=0; i<data.length; i++) {
            if (data[i].satisfaction === 'very-poor') {
                results[0]++;
            } else if (data[i].satisfaction === 'poor') {
                results[1]++;
            } else if (data[i].satisfaction === 'fair') {
                results[2]++;
            } else if (data[i].satisfaction === 'good') {
                results[3]++;
            } else {
                results[4]++;
            }
        }
        return results;
    }

    // this is for the table
    componentDidMount() {
        let stateCopy = this.state;
        stateCopy.textNames = ['Political Leaning', 'Mail Convenience', 'Participation', 'Online Voting', 'Overall Satisfaction'];
        stateCopy.questionNames = ['leaning', 'mail', 'participation', 'online', 'satisfaction'];
        this.feedbackRef = firebase.database().ref('feedback');
        this.feedbackRef.on('value', (snapshot) => {
            let feedback = snapshot.val();
            feedback = Object.keys(feedback).map( (key => {
                let response = feedback[key];
                return response;
            }));
            let totalResponses = this.getOverallSatisfaction(feedback);
            stateCopy.overallSatisfaction = totalResponses;
            feedback = this.processResponses(feedback);
            stateCopy.allFeedback = feedback;
            stateCopy.charts[0] = ({data: totalResponses, text: 'Overall Satisfaction', labels: ["Very Poor", "Poor", "Fair", "Good", "Very Good"],
                                    backgroundColor: ['#FC8F6E', '#D7A44A', '#9DB756', '#5EC087', '#3EBEBF']});       // Store all charts first? then select which one to display?
            stateCopy.charts[1] = ({data: feedback.mail, text: 'Mail Convenience', labels: ["Very Poor", "Poor", "Fair", "Good", "Very Good"],
                                    backgroundColor: ['#FC8F6E', '#D7A44A', '#9DB756', '#5EC087', '#3EBEBF']}); 
            stateCopy.charts[2] = ({data: feedback.leaning, text: 'Political Leaning', labels: ["Democrat", "Republican", "Other"],
                                    backgroundColor: ['#164074', '#CF2E29', '#A9AAAD']}); 
            this.setState(stateCopy);
        });
            
    }

    componentWillUnmount() {
        this.feedbackRef.off();
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
        let newChart = {};
        if (this.state.questionNames[this.state.questionNames.indexOf(question)] === 'leaning') {
            newChart.labels = ["Democrat", "Republican", "Other"];
            newChart.backgroundColor = ['#164074', '#CF2E29', '#A9AAAD'];
        } else if (this.state.questionNames[this.state.questionNames.indexOf(question)] === 'mail') {
            newChart.labels = ["Very Poor", "Poor", "Fair", "Good", "Very Good"];
            newChart.backgroundColor = ['#FC8F6E', '#D7A44A', '#9DB756', '#5EC087', '#3EBEBF'];
        } else if (this.state.questionNames[this.state.questionNames.indexOf(question)] === 'participation') {
            newChart.labels = ["Yes", "No"];
            newChart.backgroundColor = ['#2ba031', '#a02b2b'];
        } else if (this.state.questionNames[this.state.questionNames.indexOf(question)] === 'online') {
            newChart.labels = ["Yes", "No"];
            newChart.backgroundColor = ['#2ba031', '#a02b2b'];
        } else {
            newChart.labels = ["Very Poor", "Poor", "Fair", "Good", "Very Good"];
            newChart.backgroundColor = ['#FC8F6E', '#D7A44A', '#9DB756', '#5EC087', '#3EBEBF'];
        }
        newChart.data = this.state.allFeedback[question];
        newChart.text = this.state.textNames[this.state.questionNames.indexOf(question)];
        // chartDataCopy.charts[chart] = {data: this.state.allFeedback[question], text: this.state.textNames[this.state.questionNames.indexOf(question)]};
        chartDataCopy.charts[chart] = newChart;
        this.setState(chartDataCopy);    
    }


    render() {
        // console.log(this.state.questionNames);
        // Options representing the drop down menu the user can choose to display data
        let options = [];
        for (let j=0; j<5; j++) {
            options[j] = <option key={j} value={this.state.questionNames[j]}>{this.state.textNames[j]}</option>
        }

        let user = firebase.auth().currentUser;
        
        
        let charts = this.state.charts.map( (chart) => {
            return (
                <div className="chart" key={this.state.charts.indexOf(chart)}>
                    <div>
                        {user ? <select onChange={ (event) => {            
                            this.updateChart(this.state.charts.indexOf(chart), event.target.value)
                        }}>{options}</select> : <div></div>}
                    </div>
                    {user ? <div className="input-group-append">
                        <button type="button" className="btn btn-danger" onClick={ () => this.removeChart(this.state.charts.indexOf(chart))}>
                            <span className="fa fa-times" aria-label="remove"></span>
                        </button>
                    </div> : <div></div>}
                    <Chart chartData={[chart.data]} text={chart.text} labels={chart.labels} backgroundColor={chart.backgroundColor}/>
                </div>);
        });
        
        let stateCopy = this.state;
        // Returns the charts to be displayed on the application. When the user presses the add chart button, a new 
        // chart is rendered. Add chart is only displayed when the user has inputted a county.
        return (
            <div id="charts">
                <div id="charts-header">
                {user ? <button id="add-chart" onClick={ () => {
                        stateCopy.charts.push({data: this.state.overallSatisfaction, text: 'Overall Satisfaction', 
                                               labels: ["Very Poor", "Poor", "Fair", "Good", "Very Good"],
                                               backgroundColor: ['#FC8F6E', '#D7A44A', '#9DB756', '#5EC087', '#3EBEBF']});
                        this.setState(stateCopy);
                    }}>Add Chart</button>
                    : <div></div>}
                </div>
                <div id="charts-container">
                    {this.state.charts.length > 0 ? charts : <div />}
                </div> 
            </div>
        );
    }
}
