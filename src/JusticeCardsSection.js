import React, { Component } from 'react';
import JusticeCard from './JusticeCard';
import { Grid, Row, Alert } from 'react-bootstrap';

//Component that renders all of the current Justices at the beginning of the application
export default class JusticeCardsSection extends Component {
    //Takes in the scores.csv file as a prop
    constructor(props, context) {
        super(props, context);
    
        this.handleChange = this.handleChange.bind(this);
        
        //Initializes the value to three (meaning that it displays all current justices by default) 
        this.state = {
          value: 3
        };
      }

      //Chooses which of the current justices to display based on the button that was pushed
      displayCharts = () => {
          if (this.state.value === 3) {
              return (
                <Grid>
                    <Row className="show-grid">
                        <JusticeCard color={"#F6CDC8"} data={this.props.courtData.filter( (obj) => obj.justice_name === "John Roberts")} />
                        <JusticeCard color={"#F6CDC8"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Samuel Alito")} />
                    </Row>
                    <Row className="show-grid">
                        <JusticeCard color={"#BEDBFE"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Stephen Breyer")} />
                        <JusticeCard color={"#BEDBFE"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Ruth Bader Ginsburg")} />
                    </Row>
                    <Row className="show-grid">
                        <JusticeCard color={"#BEDBFE"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Elena Kagan")} />
                        <JusticeCard color={"#BEDBFE"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Sonia Sotomayor")} />
                    </Row>
                    <Row className="show-grid">
                        <JusticeCard color={"#F6CDC8"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Clarence Thomas")} />
                    </Row>
                </Grid>
            ) 
          } else if (this.state.value === 2) {
              return (
                <Grid>
                    <Row className="show-grid">
                        <JusticeCard color={"#BEDBFE"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Stephen Breyer")} />
                        <JusticeCard color={"#BEDBFE"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Ruth Bader Ginsburg")} />
                    </Row>
                    <Row className="show-grid">
                        <JusticeCard color={"#BEDBFE"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Elena Kagan")} />
                        <JusticeCard color={"#BEDBFE"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Sonia Sotomayor")} />
                    </Row>
                </Grid>
              )
          } else {
              return (
                <Grid>
                <Row className="show-grid">
                    <JusticeCard color={"#F6CDC8"} data={this.props.courtData.filter( (obj) => obj.justice_name === "John Roberts")} />
                    <JusticeCard color={"#F6CDC8"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Samuel Alito")} />
                </Row>
                <Row className="show-grid">
                    <JusticeCard color={"#F6CDC8"} data={this.props.courtData.filter( (obj) => obj.justice_name === "Clarence Thomas")} />
                </Row>
            </Grid>
              )
          }
      }
      
      handleChange(e) {
        this.setState({ value: e });
      }

    render() {
        return (
            <div>
                <div>
                    <h2 id="h2">Change in Ideology of Current Justices</h2>
                    <Alert id="p" bsStyle="warning">
                        Note: Justices Neil Gorsuch and Brett Kavanaugh are not listed under current justices because the dataset that provides the
                        "Martin-Quinn" scores only goes until 2015.
                    </Alert>
                    <p id="p">
                        Developed by Andrew D. Martin (University of Michigan, College of Literature, Science, and the Arts) and Kevin M. Quinn 
                        (Department of Political Science, University of Michigan), "Martin-Quinn" scores measure each justice's political leanings 
                        on a left-right political spectrum. These scores are based on the voting record and written opinion of the justices as well 
                        as other factors such as their speeches and the political climate when they were appointed. The graphs below portray how 
                        each justice's ideology shifts over time. Higher positive numbers represent more conservative beliefs while higher negative 
                        numbers correspond to more liberal beliefs. 
                    </p>
                </div>

                <br/>
                
                {/* Renders a group of three buttons */}
                <div className="btn-group">
                    <Grid>
                        <Row>
                            <button id="republican" value={1} onClick={ () => {
                                    this.setState({ value: 1 })
                                }}>
                                <h3 id="h3">Republican Justices</h3>
                            </button>
                            <button id="democrat" value={2} onClick={ () => {
                                    this.setState({ value: 2 })
                                }}>
                                <h3 id="h3">Democratic Justices</h3>
                            </button>
                            <button id="neutral" value={3} onClick={ () => {
                                    this.setState({ value: 3 })
                                }}>
                                <h3 id="h3">All Justices</h3>
                            </button>
                        </Row>
                    </Grid>
                </div>

                <br/>

                {/* Calls the displayCharts() method to determine which justices to display */}
                {this.displayCharts()}
            </div>
        )
    }
}