'use-strict';

console.log("testing one two three");

let state = {
    targetYear: [2016],
    targetFocus: ['Total Voter Turnout'],
    targetAge: ['18-24']
};

let mymap = null;

//Call createMap function here to load it up on start with default values above
createMap();

$('#buttonTest').click(function(){
    console.log($('#buttonTest').attr('value'));
    state.targetYear = $('#buttonTest').attr('value');
});

//year option clicked
function yearClicked(value){
    let newYear = parseInt(value);

    //then, empty state.
    state.targetYear = [];
    
    //push new object to state array
    state.targetYear.push(newYear);
}

//age option clicked
function ageClicked(value){
    let newAge = value;

    //then, empty state.
    state.targetAge = [];
    
    //push new object to state array
    state.targetAge.push(newAge);
}

//focus option clicked
function focusClicked(value){
    let newFocus = value;

    //then, empty state.
    state.targetFocus = [];
    
    //push new object to state array
    state.targetFocus.push(newFocus);
}

//Go button clicked
function goClicked(){
    console.log(state.targetAge);
    console.log(state.targetYear);
    console.log(state.targetFocus);
       if(mymap !== undefined || mymap !== null) {
        mymap.remove(); 
      }
    createMap();
}

// function handleFileSelect(evt) {
//   let file = evt.target.files[0];

function createMap(){

    let file = "./data/voterparticipation2.csv";
    Papa.parse(file, {
     header: true,
     dynamicTyping: true,
     download: true,
     trimHeaders: true,
     complete: function(papaResults) {
       let papaData = papaResults.data;
       console.log(papaData);
       let targetPapaData = papaData.filter(obj => obj.Age === state.targetAge[0] && obj.Year === state.targetYear[0] && obj.County != 'zWashington State');
       console.log(targetPapaData);
 
       //////////
       //////////////////////////// Creating Map //////////////////////////// 

        mymap = L.map('mapid').setView([47.3511, -120.7401], 7);
 
         L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3lsZWF2YWxhbmkiLCJhIjoiY2pvOTB2Znd2MDA1eTNxbWsxNHAzdWtsZSJ9.UBa07eG7h1r273nHqQuKeA', {
             attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
             maxZoom: 18,
             id: 'mapbox.streets',
             accessToken: 'your.mapbox.access.token'
         }).addTo(mymap);
 
         // Add geoJson data for county boundary data
         $.getJSON('./data/counties/combined.geo.json', function(data){
             L.geoJson(data).addTo(mymap);
         });
 
         function onSuccessCallback(response){
             console.log(response);
             useResponse(response);
             alsoThis(response);
         }
 
         let promiseCountiesData = $.getJSON('./data/counties/combined.geo.json', function(data){
             return data.features;
         });
 
         promiseCountiesData.then(onSuccessCallback);
 
 
         // Map Styling
         function getColor(d) {
                 return d > 0.9 ? '#1C3328' :
                 d > 0.8  ? '#2E5442' :
                 d > 0.7  ? '#41765D' :
                 d > 0.6  ? '#539777' :
                 d > 0.5   ? '#65B891' :
                 d > 0.4   ? '#81C4A5' :
                 d > 0.3   ? '#9DD1B9' :
                             '#C7E5D7';
         }
 
         function addStyle(feature) {
             let specificCountyData = targetPapaData.filter(obj => obj.County === feature.properties.name);
             return {
                 fillColor: getColor(specificCountyData[0][`${state.targetFocus[0]}`]),
                 weight: 2,
                 opacity: 1,
                 color: 'white',
                 dashArray: '3',
                 fillOpacity: 0.7
             };
         }
         function useResponse(data){
             L.geoJson(data, {style: addStyle}).addTo(mymap);
         }
 
             
        // Map Interactivity 
         function highlightFeature(e) {
             let layer = e.target;
 
             layer.setStyle({
                 weight: 5,
                 color: '#666',
                 dashArray: '',
                 fillOpacity: 0.7
             });
 
             if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
                 layer.bringToFront();
             }
             info.update(layer.feature.properties);
         }
 
         function resetHighlight(e) {
             geojson.resetStyle(e.target);
             info.update();
         }
 
         function zoomToFeature(e) {
             mymap.fitBounds(e.target.getBounds());
         }
 
         let geojson;
         function onEachFeature(feature, layer) {
             layer.on({
                 mouseover: highlightFeature,
                 mouseout: resetHighlight,
                 click: zoomToFeature
             });
         }
 
         function alsoThis(data){
             geojson = L.geoJson(data, {
                 style: addStyle,
                 onEachFeature: onEachFeature
             }).addTo(mymap);
         }
 
         let info = L.control();
 
         info.onAdd = function (map) {
             this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
             this.update();
             return this._div;
         };
 
         // Update the control based on feature properties passed
         info.update = function (props) {
             if (props != null){
                 let specificCountyData = targetPapaData.filter(obj => obj.County === props.name);
                 console.log(specificCountyData);
                 this._div.innerHTML = `<h4>${state.targetFocus[0]}</h4>` +  (props ?
                     '<b>' + props.name + '</b><br />' + (Math.round(specificCountyData[0][`${state.targetFocus[0]}`] * 100) + "%")
                     + ` of ${state.targetAge[0]} year olds` + ` in ${state.targetYear[0]}`
                     : 'Hover over a state');
             }
             
         };
 
         info.addTo(mymap);
 
         let legend = L.control({position: 'bottomright'});
 
         legend.onAdd = function (map) {
         
             let div = L.DomUtil.create('div', 'info legend'),
                 grades = [0, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
                 labels = []; //not sure why this has to be here either
         
             // Loop through legend intervals and generate a label with a colored square for each interval
             for (let i = 0; i < grades.length; i++) {
                 div.innerHTML +=
                     '<i style="background:' + getColor(grades[i] + 0.01) + '"></i> ' +
                     (grades[i] * 100) + (grades[i + 1] ? '&ndash;' + ((grades[i + 1])* 100) + '%' + '<br>' : '%+');
             }
         
             return div;
         };
         
         legend.addTo(mymap);
 
         ///////END MAP STUFF//////
     }
   });

}


// }

// $(document).ready(function(){
//   $("#csv-file").change(handleFileSelect);
// });
$("#csv-file").remove(); //no idea why this line is still required