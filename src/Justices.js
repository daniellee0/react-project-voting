import React, { Component } from 'react';
import NavbarFeatures from './Navbar';
import JusticeCardsSection from './JusticeCardsSection';
import JusticeTimeline from './JusticeTimeline';
import CreateTable from './CreateTable';
import Footer from './Footer';
import PickJustice from './PickJustice';

// Component that represents all of the charts that use the Justice Ideology Scores
export default class Justices extends Component {
    render() {
        return (
            <div id="about">
                <NavbarFeatures dark={false} light={true}/>
                <section className="about">
                    <div className="content-container">
                        <JusticeContent courtData={this.props.courtData}/>
                        <PickJustice courtData={this.props.courtData}/>
                        <JusticeTimeline courtData={this.props.courtData} />
                        <CreateTable courtData={this.props.courtData} />
                        <Footer />
                    </div>
                </section>
            </div>
        );
      }
}

// Component that introduces the ideology scores
export class JusticeContent extends Component {
    render() {
        return (
            <div>
                <h1>Ideology of the Supreme Court</h1>
                <p>
                    The Supreme Court of the United States of America is comprised of nine justices who were appointed by presidents with
                    different political ideologies. Therefore, the justices represent a wide range of political beliefs. Supreme Court Justices 
                    appointed for life so they can focus on the US Constitution instead of pleasing the people that will support them for 
                    re-election.
                </p>
                <JusticeCardsSection courtData={this.props.courtData} />
            </div>
        )
    }
}