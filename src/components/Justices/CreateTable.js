import React, { Component } from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

//Comonent that creates the interactive table 
export default class CreateTable extends Component {
    render() {
        this.data = this.props.courtData;
        return(
            <div>
                <h2>Justice Table Search</h2>
                <BootstrapTable data={this.data} striped hover pagination>
                    <TableHeaderColumn isKey dataField='justice_code' dataSort={true}>Justice Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='justice_name' dataSort={true} filter={{type: 'TextFilter', delay: 750}}>Justice Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='court_term' dataSort={true}
                        filter={{ 
                            type: 'NumberFilter', 
                            delay: 750, 
                            numberComparators: [ '=', '>', '<', '>=', '<=' ]}}
                    >Term</TableHeaderColumn>
                    <TableHeaderColumn dataField='posterior_mean' dataSort={true}
                        filter={{ 
                            type: 'NumberFilter',
                            delay: 750, 
                            numberComparators: [ '=', '>', '<', '>=', '<=' ]}}
                    >Post. Mean</TableHeaderColumn>
                    <TableHeaderColumn dataField='standard_deviation' dataSort={true}
                        filter={{ 
                            type: 'NumberFilter', 
                            delay: 750, 
                            numberComparators: [ '=', '>', '<', '>=', '<=' ]}}
                    >Std. Dev</TableHeaderColumn>
                    <TableHeaderColumn dataField='posterior_median' dataSort={true}
                        filter={{ 
                            type: 'NumberFilter', 
                            delay: 750, 
                            numberComparators: [ '=', '>', '<', '>=', '<=' ]}}
                    >Post. Median</TableHeaderColumn>
                </BootstrapTable>
            </div>)
    }
  }