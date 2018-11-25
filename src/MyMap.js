import React, { Component } from 'react';
import Papa from 'papaparse';
import {LeafletMap, Map, TileLayer} from 'react-leaflet';


let state = {
  targetYear: [2016],
  targetFocus: ['Total Voter Turnout'],
  targetAge: ['18-24']
};

let parsedDataGlobal = {
  data: []
};

export default class MyMap extends Component {
  
    render() {
    // Parse the csv data into a JSON object and pass to global
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
        console.log(papaData); //Testing
        console.log(targetPapaData); //Testing
      }
    });
    console.log(parsedDataGlobal.data); //Testing
    // End Parsing


      return (
        <Map center={[51.505, -0.09]}>
          <TileLayer
            url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3lsZWF2YWxhbmkiLCJhIjoiY2pvOTB2Znd2MDA1eTNxbWsxNHAzdWtsZSJ9.UBa07eG7h1r273nHqQuKeA'
            attribution= 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          />
        </Map>
      );
    }
  }