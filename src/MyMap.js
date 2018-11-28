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
      allData: [],
      targetYear: props.year,
      targetFocus: props.focus,
      targetAge: props.age
    };
  }

  componentDidUpdate(prevProps) {
    if(this.props.year !== prevProps.year || this.props.age !== prevProps.age || this.props.focus !== prevProps.focus){
      this.setState((currentState, currentProps) => {
        let returnObject = {
          targetYear: this.props.year,
          targetFocus: this.props.focus,
          targetAge: this.props.age,
          data: currentState.allData.filter(obj => obj.Age === this.props.age && obj.Year === this.props.year && obj.County !== 'zWashington State')
        }
        return returnObject;
      })
    }
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
        let temp = papaData.filter(obj => obj.Age === this.state.targetAge && obj.Year === this.state.targetYear && obj.County !== 'zWashington State');
        this.setState( {
          allData: papaData,
          data: temp
        });
      }
    });
  }

  // onMouseOut = (e) => {
  //   // this.resetStyle(e.target);
  // 	console.log('onMouseOut', e)
  // }
  
  // onMouseOver = (e) => {
  //   let layer = e.target;
 
  //   layer.setStyle({
  //       weight: 5,
  //       color: '#666',
  //       dashArray: '',
  //       fillOpacity: 0.7
  //   });

  //   if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
  //     layer.bringToFront();
  //   }
  // 	console.log('onMouseOver', e)
  // }

  //Function for adding style to the geojson data of the map
  addStyle = (feature) => {
    let specificCountyData = this.state.data.filter(obj => obj.County === feature.properties.name);
    return {
      fillColor: this.getColor(specificCountyData[0][this.state.targetFocus]),
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

  onEachFeature = (feature, layer) => {
    let specificCountyData = this.state.data.filter(obj => obj.County === feature.properties.name);
    let displayedText = `<h2>${this.state.targetFocus}</h2>` +  
      '<b>' + feature.properties.name + " County" + '</b><br />' + (Math.round(specificCountyData[0][`${this.state.targetFocus}`] * 100) + "%")
      + ` of ${this.state.targetAge} year olds` + ` in ${this.state.targetYear}`;
    layer.on({
      click: function(event) {
        var popup = L.popup()
            .setLatLng(event.latlng)
            .setContent(displayedText)
            .openOn(layer._map);

          }
    });
  }

  render() {
      let mapViewport = {
        center: [47.3511, -120.7401],
        zoom: 7
      }
      
      // let legendDiv = L.DomUtil.create('div', 'info legend'),
      //   grades = [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
      //   labels = [];
      // for (let i = 0; i < grades.length; i++) {
      //   legendDiv.innerHTML +=
      //       '<i style="background:' + this.getColor(grades[i] + 0.01) + '"></i> ' +
      //       (grades[i] * 100) + (grades[i + 1] ? '&ndash;' + ((grades[i + 1])* 100) + '%' + '<br>' : '%+');
      // }  
      // let legend = <AttributionControl position='bottomright'>{legendDiv}</AttributionControl>;
      // let legend = <AttributionControl position='bottomright'><div><p>Testing</p></div></AttributionControl>;
      // console.log(legend);

      // let infoDiv = L.DomUtil.create('div', 'info');

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
            <GeoJSON key={hash(this.state.geojsondata)} data={this.state.geojsondata} style={this.addStyle} onEachFeature={this.onEachFeature}/>
            : 
            <div />}
            {/* {legend} */}
          </Map>
      );
    }
  }