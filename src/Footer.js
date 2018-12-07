import React, { Component } from 'react'; //import React Component
import 'font-awesome/css/font-awesome.min.css';
import "./Footer.scss"

export class Footer extends Component {
    render() {
        return (
            <footer>
                <p>Contact us! E-mail for serious inquires: <a href="mailto:votefact340@gmail.com" rel="noopener noreferrer" target="_blank" ><i className="fa fa-envelope-o fa-2x" alt="email link"></i></a></p>
                
                <p>&copy; Copyright 2018 Kyle Avalani, Daniel Lee, Andrea Koozer, Hilton Vo</p>
                <p>Data from Kaggle: <a href="https://www.kaggle.com/umichigan/court-justices"><i className="fa fa-database fa-2x" alt="data source link"></i></a> 
                    &nbsp;&nbsp;&nbsp;and the Secretary of State: <a href="https://www.sos.wa.gov/elections/research/data-and-statistics.aspx"><i className="fa fa-check-square-o fa-2x" aria-hidden="true"></i></a>
                </p>
            </footer>
        )
    }
}

export default Footer;