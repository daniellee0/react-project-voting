import React, { Component } from 'react';
import Papa from 'papaparse';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';
import hash from 'object-hash'; //for making unique keys
import Control from 'react-leaflet-control';

// Component representing the single map to be displayed on the web application
export class MyMap extends Component {
  
  // Sets the state for the map. Takes in year, focus, and age props. 
  constructor(props){
    super(props)
    this.state = {
      geojsondata: [],
      homeCountyGeojson: [], 
      data: [],
      allData: [],
      targetYear: props.year,
      targetFocus: props.focus,
      targetAge: props.age,
      countyInfoPopup:         
        <div>
          <h2>WA State County Data</h2><br />Hover over a county to see the official data
        </div>
    };
  }

  // Sets a new state when the component will receive props. 
  componentWillReceiveProps(nextProps){
    this.setState({
      targetYear: nextProps.year,
      targetFocus: nextProps.focus,
      targetAge: nextProps.age
    })
  }

  // Sets a new state when the component will updates.
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

  // Is called when the component is mounted. Retrieves geojson data.
  componentDidMount() {
    this.mapRef = this.refs.map.leafletElement; //Add instance variable to be able to reference to map later on 
    //Retrieve geojson data for county boundaries on the map and pass to state
    fetch('data/combined.geo.json')
      .then(response => {
        let dataPromise = response.json();
        return dataPromise;
      })
      .then( jsonData => {
        let listLocal = jsonData.features.map( (obj) => {
            return obj.properties.name
        });
        this.setState({
          geojsondata: jsonData, 
          listOfCounties: listLocal
        });
      }); 

    // Parse the csv voter data into a JSON object and pass to state
    let file = "data/voterparticipation.csv";
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

  getSpecificCountyData = () => {
    let countyGeoJSON = this.state.geojsondata.features.filter(obj => obj.properties.name === this.props.county);
    return countyGeoJSON; 
  }

  //Function for adding style to the geojson data of the map
  addStyle = (feature) => {
    let specificCountyData = this.state.data.filter(obj => obj.County === feature.properties.name);
    return {
      fillColor: this.getColor(specificCountyData[0][this.state.targetFocus]),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.8
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

  addSpecificStyling = (feature) => { //Specific styling for user's home county
  let specificCountyData = this.state.data.filter(obj => obj.County === feature.properties.name);
    return {
      fillColor: this.getColor(specificCountyData[0][this.state.targetFocus]),
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    }
  }

  //Applies the Control popup
  onEachFeature = (feature, layer) => {

    // Adds popup information and text to the state, so it may be called and in render()
    layer.on({
      mouseover: (event) => {
        let specificCountyData = this.state.data.filter(obj => obj.County === feature.properties.name);
        let targetFocus = Math.round(specificCountyData[0][this.state.targetFocus] * 100);
        let displayedText = 
        <div>
          <h2>{this.state.targetFocus}</h2> <b>{feature.properties.name} County</b> <br />{targetFocus}% of {this.state.targetAge} year olds in {this.state.targetYear}
        </div>;
        this.setState({countyInfoPopup: displayedText});
      },
      click: (event) => {
        this.mapRef.fitBounds(layer.getBounds()); //Zooms to county clicked on
      }
    });

  }

  // Render Map component. Contains the map and legend as well. 
  render() {

      let mapViewport = {
        center: [47.3511, -120.7401],
        zoom: 6
      }

      let legend = 
        <div className='info legend'>
          <i style={{background:"#C7E5D7"}}></i>0-30%<br></br>
          <i style={{background:"#9DD1B9"}}></i>30-40%<br></br>
          <i style={{background:"#81C4A5"}}></i>40-50%<br></br>
          <i style={{background:"#65B891"}}></i>50-60%<br></br>
          <i style={{background:"#539777"}}></i>60-70%<br></br>
          <i style={{background:"#41765D"}}></i>70-80%<br></br>
          <i style={{background:"#2E5442"}}></i>80-90%<br></br>
          <i style={{background:"#1C3328"}}></i>90+%<br></br>
        </div>;

      // Returns a map that contains a legend and and the map itself. This data is layered over the initial tile layer.
      return (
          <Map ref="map" id="map" viewport={mapViewport} style={{ height: '470px' }}>
            <TileLayer
              url='https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3lsZWF2YWxhbmkiLCJhIjoiY2pvdzd3NGtzMGgxMjNrbzM0cGhwajRxNyJ9.t8zAjKz12KLZQ8GLp2hDFQ'
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
              minZoom='2'
              maxZoom='20'
              id='mapbox.streets'
            />
            {this.state.data.length > 0 ? 
            <div>
              <GeoJSON ref="geojson" key={hash(this.state.geojsondata)} data={this.state.geojsondata} style={this.addStyle} onEachFeature={this.onEachFeature.bind(this)}/>
            
              {this.state.listOfCounties ? 
              this.state.listOfCounties.includes(this.props.county) ?
                <GeoJSON ref="geojson2" key={hash(this.props.county)} data={this.getSpecificCountyData()} style={this.addSpecificStyling} onEachFeature={this.onEachFeature.bind(this)}/>
              :
              <div />
            :
            <div />}
            
            </div>
            : 
            <div />}

            <Control position="bottomright">
              <div>
                {legend}
              </div>
            </Control>
            <Control position="topright">
              <div className='info legend'>
                {this.state.countyInfoPopup}
              </div>
            </Control>
            <Control position='bottomleft'>
              
            {this.state.listOfCounties ? 
            this.state.listOfCounties.includes(this.props.county) ?
              <div className='info'>
                Home County: {this.props.county}
              </div>
              :
              <div className='info'>
                Enter your Home County in the Form Above
              </div>
            :
            <div/>
            }
            

              {/* <div className='info legend'>
                <p>Home County: {this.props.county}</p>
              </div> */}

            </Control>
          </Map>
      );
    }
  }