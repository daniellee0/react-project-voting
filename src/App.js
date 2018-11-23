import 'bootstrap/dist/css/bootstrap.min.css';
import {} from './style.css';
import React, { Component } from 'react';
import Header from './Header';
import Introduction from './Introduction';
import Description from './Description';
import Start from './Start';
import Form from './Form';
import Analytics from './Analytics';
import Footer from './Footer';


export default class App extends Component {
    render() {
        return (
            <div id="main">
                <Header />
                <Introduction />
                <Description />
                <Start />
                <Form />
                <Analytics />
                <Footer />
            </div>
        );
    }
}



