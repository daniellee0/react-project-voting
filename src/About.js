import React, { Component } from 'react';
import NavbarFeatures from './Navbar';

// About component that represents information about the web application and is separate from the homepage.
// The user can navigate to this page to learn more about the web application. 
export default class About extends Component {
    // Renders the About component that contains information about the web app and also contains a navigation bar.
    render() {
      return (
        <div id="about">
            <section className="about">
                <div className="content-container">
                    <AboutContent />
                </div>
            </section>
        </div>
      );
    }
}

// AboutContent component that represents the content of the about page excluding the navigation bar. 
// This component contains information about the context around the app and also links regarding the
// data used for the application.
class AboutContent extends Component {
    render() {
        return (
            <div>
                <h1>About</h1>

                <div className="cards">
                    <div>
                        <i className="fas fa-pencil-alt fa-3x"></i>
                        <p>Take the time to leave a meaningful review about your voting experience. Whether you're on the go, or at home, VoteFact provides you with access anywhere and everywhere.</p>
                    </div>
                    <div>
                        <i className="far fa-user fa-3x"></i>                    
                        <p>Review analytics about voter satisfaction in your local county. Government entities can utilize this data to develop comprehensive solutions in regard to voting.</p>
                    </div>
                    <div>
                        <i className="fas fa-chart-bar fa-3x"></i>
                        <p>Analyze Washington State voter registration and turnout data through an interactive map. Filter by year and age to see how the data changes.</p>
                    </div>
                    <div>
                        <i className="fa fa-university fa-3x"></i>
                        <p>Your votes affect who gets put on the Supreme Court! Review analytics about the ideologies of Supreme Court Justices.</p>
                    </div>
                </div>

                <p>
                    With the 2018 Midterm Election fast approaching, the importance of registering to vote is
                    as crucial as ever. Like all elections,
                    this Midterm election is important. However, with 
                    an <a href="http://www.people-press.org/2017/10/05/the-partisan-divide-on-political-values-grows-even-wider/">increasingly partisan divide</a>
                    widening between Democrats and Republicans, this election takes special importance.
                    Currently, the Republicans control the House, Senate, executive branch and with
                    the recent appointment of Kavanaugh, now the Judiciary branch as well. This Midterm
                    provides Democrats with a chance to take the House and potentially even the Senate,
                    and is an critical battle for Republicans if they want to remain in control.
                </p>

                <p>
                    Many voters struggle with recognizing the value of their vote. A common sentiment is
                    "How does my one vote matter?". While it may not seem like your individual vote can make the 
                    difference, if everyone shared that sentiment, then it truly wouldn't matter! Additionally, 
                    with races sometimes coming down right to the line, a few votes can make all the difference.
                    Senator Bernie Sanders once won a mayoral election by a margin of just <a href="https://en.wikipedia.org/wiki/Burlington_mayoral_election,_1981">10 votes</a>.
                </p>

                <p>
                    With the flood of "fake news" and overall false information during the 2016
                    Presidential Election, it's clear that many Americans feel there's an abundance
                    of false information circulating around the Internet. Providing Americans with
                    facts is vital in ensuring people vote responsibly and with the proper 
                    backing with facts. This task becomes even more crucial with even the President himself
                    spreading false information, like claims that millions of illegal immigrants
                    voted in the election.
                </p>

                <p> &nbsp;&nbsp;&nbsp;&nbsp; This web application addresses a lack of accessible information about voting experiences and voter turnout. 
                    In particular, it aims to give users tools to compare the differences between voter satisfaction and voter turnout in particular counties.
                    Thus, users can utilize this information to determine how closely voter satisfaction might correlate with voter turnout.
                </p>

                <h2>Project Data:</h2>
                <div className="cards">
                    <div>
                        <i className="fa fa-gavel fa-3x"></i>
                        <p>
                            Supreme Court ideology data (1937 - 2015) from the Universtiy of Michigan can be viewed 
                            <a href="https://www.kaggle.com/umichigan/court-justices"> here</a>.
                        </p>
                    </div>
                    <div>
                        <i className="fa fa-check-square fa-3x"></i>
                        <p>
                            Voter Registration data from the WA Secretary of State can be
                             viewed <a href="https://www.sos.wa.gov/elections/research/data-and-statistics.aspx">here </a>
                            in the "Voter Participation Excel Spreadsheet".
                        </p>
                    </div>
                </div>

            </div> 
        );
    }
}