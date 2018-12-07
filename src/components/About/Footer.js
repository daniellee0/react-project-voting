import React, { Component } from 'react'; //import React Component
import 'font-awesome/css/font-awesome.min.css';
import "./Footer.scss"

export class Footer extends Component {
    render() {
        return (
            <footer>
                <p>Contact us! E-mail for serious inquires: <a aria-label="Email" href="mailto:votefact340@gmail.com" rel="noopener noreferrer" target="_blank" ><i aria-label="Email" className="fa fa-envelope-o fa-2x" alt="email link"></i></a></p>    
                <p>Data from Kaggle: <a aria-label="Justice data" href="https://www.kaggle.com/umichigan/court-justices"><i aria-label="Justice data" className="fa fa-database fa-2x" ></i></a> 
                    &nbsp;&nbsp;and the Secretary of State: <a aria-label="Election data" href="https://www.sos.wa.gov/elections/research/data-and-statistics.aspx"><i aria-label="Election data" className="fa fa-university fa-2x" ></i></a>
                </p>
                <p>&copy; Copyright 2018 Kyle Avalani, Daniel Lee, Andrea Koozer, Hilton Vo</p>
            </footer>
        )
    }
}

export default Footer;