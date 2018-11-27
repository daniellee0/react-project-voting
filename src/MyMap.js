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
  
  constructor(props){
    super(props)
    this.state = {
      geojsondata: [],
      testing: false
    };
  }

  // componentDidMount(){
  //   let tempState = this.state;

  //   fetch('/data/combined.geo.json')
  //   .then(response => {
  //     let dataPromise = response.json();
  //     return dataPromise;
  //   })
  //   .then( jsonData => {
  //     // statesGeoJsonData.data = [];
  //     // console.log(statesGeoJsonData.data);
  //     // // statesGeoJsonData.data.push(<GeoJSON data={jsonData} style={{color: '#006400'}} />);
  //     // statesGeoJsonData.data.push(jsonData);
  //     // console.log(statesGeoJsonData.data);



  //     // let newGeoJsonData = {
  //     //   data: []
  //     // }
  //     // newGeoJsonData.data.push(jsonData);
  //     // this.setState(newGeoJsonData);

  //     // this.setState({
  //     //   geojsondata: jsonData
  //     // })

  //     tempState.geojsondata = jsonData;
  //     // console.log(this.state.geojsondata);
  //   }); 
  //   console.log(tempState);
  //   this.setState(tempState);
  //   console.log(this.state);
  //   // console.log(this.state.geojsondata);
  // }



  // geojsonData() {
  //   fetch('/data/combined.geo.json')
  //     .then(response => {
  //       let dataPromise = response.json();
  //       return dataPromise;
  //     })
  //     .then( jsonData => {
  //       console.log(jsonData);
  //       statesGeoJsonData.data = (jsonData);
  //     }); 
  //     console.log(statesGeoJsonData.data);
  //     return statesGeoJsonData.data;
  // }

  componentDidMount() {
    fetch('/data/combined.geo.json')
      .then(response => {
        let dataPromise = response.json();
        return dataPromise;
      })
      .then( jsonData => {
        console.log(jsonData);
        this.setState({
          geojsondata: jsonData
        });
        console.log(this.state.geojsondata);
      }); 
      console.log(this.state.geojsondata);
  }

  render() {

    const { geojsondata } = this.state;

    const apples = {
      "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "kind": "county",
        "name": "Adams",
        "state": "WA"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -118.9503,
                47.264
              ],
              [
                -117.959,
                47.2586
              ],
              [
                -117.9699,
                46.8697
              ],
              [
                -118.0466,
                46.7711
              ],
              [
                -118.2109,
                46.7383
              ],
              [
                -119.2132,
                46.7383
              ],
              [
                -119.372,
                46.7383
              ],
              [
                -119.3665,
                46.9135
              ],
              [
                -118.9832,
                46.9135
              ],
              [
                -118.9777,
                47.264
              ]
            ]
          ]
        ]
      }
    },
    {
      "type": "Feature",
      "properties": {
        "kind": "county",
        "name": "Asotin",
        "state": "WA"
      },
      "geometry": {
        "type": "MultiPolygon",
        "coordinates": [
          [
            [
              [
                -117.0388,
                46.4261
              ],
              [
                -117.0607,
                46.3549
              ],
              [
                -116.9841,
                46.2946
              ],
              [
                -116.9676,
                46.2015
              ],
              [
                -116.9238,
                46.1687
              ],
              [
                -116.9841,
                46.092
              ],
              [
                -116.9183,
                45.9934
              ],
              [
                -117.4825,
                45.9989
              ],
              [
                -117.4825,
                46.1194
              ],
              [
                -117.4222,
                46.1194
              ],
              [
                -117.4222,
                46.3823
              ],
              [
                -117.2305,
                46.4096
              ],
              [
                -117.2305,
                46.4644
              ],
              [
                -117.1977,
                46.4206
              ]
            ]
          ]
        ]
      }
    }
  ]
    };
    
    
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

      let tempString = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

      console.log(apples);
      console.log(geojsondata)

      return (
        <Map viewport={testViewport} style={{ width: '100%', height: '600px' }}>
          <TileLayer
            url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3lsZWF2YWxhbmkiLCJhIjoiY2pvdzd3NGtzMGgxMjNrbzM0cGhwajRxNyJ9.t8zAjKz12KLZQ8GLp2hDFQ'
            attribution= {tempString}
            minZoom='1'
            maxZoom='18'
            id='mapbox.streets'
          />
          {/* <GeoJSON key='7' data={apples} style={{color: '#006400'}}/> */}
          <GeoJSON key='7' data={geojsondata} style={{color: '#006400'}}/>
        </Map>
      );
    }
  }