import React, { Component } from 'react';

// Component representing the footer of the web application. This includes contact information and copyrights
export default class Footer extends Component {
    // Renders the Footer component
    render() {
        return (
            <div>
                <p></p>
                <p>© 2018 Kyle Avalani, Daniel Lee</p>
                <p>You can contact Kyle via email <a href="mailto:kyleavalani@gmail.com">here</a>.</p>
                <p>You can contact Daniel via email <a href="mailto:daleewa@gmail.com">here</a>.</p>
            </div>
        );
    }
}