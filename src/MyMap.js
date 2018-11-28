import React, { Component } from 'react';
import Papa from 'papaparse';
import L from 'leaflet';
import {Map, TileLayer, GeoJSON, AttributionControl, LayersControl} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import hash from 'object-hash'; //for making unique keys

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
    //Retrieve geojson data for county boundaries on the map and pass to state
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

    // Parse the csv voter data into a JSON object and pass to state
    let file = "/data/voterparticipation.csv";
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      download: true,
      trimHeaders: true,
      complete: (papaResults) => {
        let papaData = papaResults.data;
        let temp = papaData.filter(obj => obj.Age === this.state.targetAge[0] && obj.Year === this.state.targetYear[0] && obj.County !== 'zWashington State');
        this.setState( {
          data: temp
        });
      }
    });
  }

  //Function for adding style to the geojson data of the map
  addStyle = (feature) => {
    let specificCountyData = this.state.data.filter(obj => obj.County === feature.properties.name);
    return {
      fillColor: this.getColor(specificCountyData[0][this.state.targetFocus[0]]),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  //Called by addStyle, this adds color to each geojson county according to it's target value
  getColor = (d) => {
    return d > 0.9 ? '#1C3328' :
    d > 0.8  ? '#2E5442' :
    d > 0.7  ? '#41765D' :
    d > 0.6  ? '#539777' :
    d > 0.5   ? '#65B891' :
    d > 0.4   ? '#81C4A5' :
    d > 0.3   ? '#9DD1B9' :
                '#C7E5D7';
  }

  render() {
      let mapViewport = {
        center: [47.3511, -120.7401],
        zoom: 7
      }
      
      let legendDiv = L.DomUtil.create('div', 'info legend'),
        grades = [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
        labels = [];
      for (let i = 0; i < grades.length; i++) {
        legendDiv.innerHTML +=
            '<i style="background:' + this.getColor(grades[i] + 0.01) + '"></i> ' +
            (grades[i] * 100) + (grades[i + 1] ? '&ndash;' + ((grades[i + 1])* 100) + '%' + '<br>' : '%+');
      }  
      // let legend = <AttributionControl position='bottomright'>{legendDiv}</AttributionControl>;
      let legend = <AttributionControl position='bottomright'><div><p>Testing</p></div></AttributionControl>;
      console.log(legend);

      return (
          <Map viewport={mapViewport} style={{ width: '100%', height: '600px' }}>
            <TileLayer
              url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3lsZWF2YWxhbmkiLCJhIjoiY2pvdzd3NGtzMGgxMjNrbzM0cGhwajRxNyJ9.t8zAjKz12KLZQ8GLp2hDFQ'
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
              minZoom='1'
              maxZoom='18'
              id='mapbox.streets'
            />
            {this.state.data.length > 0 ? 
            <GeoJSON key={hash(this.state.geojsondata)} data={this.state.geojsondata} style={this.addStyle}/>
            : 
            <div />}
            {legend}
          </Map>
      );
    }
  }