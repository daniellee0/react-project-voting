import React, { Component } from 'react';
import Papa from 'papaparse';


let state = {
  targetYear: [2016],
  targetFocus: ['Total Voter Turnout'],
  targetAge: ['18-24']
};

let parsedDataGlobal = {
  data: []
};

export default class LeafletMap extends Component {
  
    render() {
    let file = "/data/voterparticipation.csv";
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      download: true,
      trimHeaders: true,
      complete: function(papaResults) {
        let papaData = papaResults.data;
        let targetPapaData = papaData.filter(obj => obj.Age === state.targetAge[0] && obj.Year === state.targetYear[0] && obj.County != 'zWashington State');
        parsedDataGlobal.data.push(targetPapaData); 
        console.log(papaData);
        console.log(targetPapaData);
      }
    });
    console.log(parsedDataGlobal.data);
      return (
        <div>
            
        </div>
      );
    }
  }