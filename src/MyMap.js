import React, { Component } from 'react';
import Papa from 'papaparse';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import hash from 'object-hash' //for making unique keys

export class MyMap extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      geojsondata: [], 
      data: [],
      targetYear: [2016],
      targetFocus: ['Total Voter Turnout'],
      targetAge: ['18-24']
    };
  }

  componentDidMount() {

    fetch('/data/combined.geo.json')
      .then(response => {
        let dataPromise = response.json();
        return dataPromise;
      })
      .then( jsonData => {
        this.setState({
          geojsondata: jsonData
        });
      }); 

    // Parse the csv data into a JSON object and pass to global
    let file = "/data/voterparticipation.csv";
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      download: true,
      trimHeaders: true,
      complete: (papaResults) => {
        let papaData = papaResults.data;
        this.setState((currentState) => {
          let targetPapaData = {data: papaData.filter(obj => obj.Age === currentState.targetAge[0] && obj.Year === currentState.targetYear[0] && obj.County !== 'zWashington State')};
          return targetPapaData;
        })
      }
    });
  }

  render() {

      let testViewport = {
        center: [47.3511, -120.7401],
        zoom: 7
      }

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
          <GeoJSON key={hash(this.state.geojsondata)} data={this.state.geojsondata} style={{color: '#006400'}}/>
        </Map>
      );
    }
  }