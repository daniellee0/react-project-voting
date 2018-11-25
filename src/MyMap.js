import React, { Component } from 'react';
import Papa from 'papaparse';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'


let state = {
  targetYear: [2016],
  targetFocus: ['Total Voter Turnout'],
  targetAge: ['18-24']
};

let parsedDataGlobal = {
  data: []
};

let statesGeoJsonData = {
  data: []
};

export class MyMap extends Component {
  
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

      let testViewport = {
        center: [47.3511, -120.7401],
        zoom: 7
      }

      function geojsonData() {
        fetch('/data/combined.geo.json')
          .then(response => {
            let dataPromise = response.json();
            return dataPromise;
          })
          .then( jsonData => {
            statesGeoJsonData.data.push(<GeoJSON data={jsonData} style={{color: '#006400'}} />);
          }); 
          return statesGeoJsonData.data;       
      }
      console.log(geojsonData());
      let tempString = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

      return (
        <Map viewport={testViewport} style={{ width: '100%', height: '600px' }}>
          <TileLayer
            url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3lsZWF2YWxhbmkiLCJhIjoiY2pvdzd3NGtzMGgxMjNrbzM0cGhwajRxNyJ9.t8zAjKz12KLZQ8GLp2hDFQ'
            attribution= {tempString}
            minZoom='1'
            maxZoom='18'
            id='mapbox.streets'
          />
          {geojsonData()}
        </Map>
      );
    }
  }