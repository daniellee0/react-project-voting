'use strict';

// Global State if begin button pressed
let beginState = {begin: false};
let analyticsState = {begin: false};

// Slide down elements when begin button is pressed
$('#begin-button').on('click', () => {
    if (!beginState.begin) {
        beginState.begin = true;
        $('#form').slideDown();
    }
});

// After a "valid" name is typed into the input box and the submit button is pressed,
// process the provided csv file and output the charts corresponding to that 
// polling location name.
$('#submit-feedback').on('click', () => {
    let name = $('#name').val();
    analyticsState.begin = true;
    $('#add-chart').css('display', 'inline');
    fetch("data/voter-feedback.csv")
    .then(response => response.text())
    .then(data => processResponses(Papa.parse(data, {header: true})))
    .then(analyticData => createCharts(analyticData, name))
    .catch(error => console.log(error))
});

// Processes the data and returns an array representing the total response feedback
// for each unique location
function processResponses(data) {
    let results = new Array();
    data.data.forEach( (entry) => {
        let contains = false;
        results.forEach( (location) => {
            if (location.PollingLocation == entry.PollingLocationName) {
                location.Overall_Experience[parseInt(entry.Overall_Experience)-1]++;
                location.Wait_Time[parseInt(entry.Wait_Time)-1]++;
                location.Registration[parseInt(entry.Registration)-1]++;
                location.Service[parseInt(entry.Service)-1]++;
                location.Timeframe[parseInt(entry.Timeframe)-1]++;
                location.Resources[parseInt(entry.Resources)-1]++;
                location.Comments.push(entry.Comments);
                contains = true;
            }
        });
        if (contains === false) {
            let newLocation = {PollingLocation: entry.PollingLocationName, 
                Overall_Experience: [0, 0, 0, 0, 0],
                Wait_Time: [0, 0, 0, 0, 0],
                Registration: [0, 0, 0, 0, 0],
                Service: [0, 0, 0, 0, 0],
                Timeframe: [0, 0, 0, 0, 0],
                Resources: [0, 0, 0, 0, 0],
                Comments: []
            };
            newLocation.Overall_Experience[parseInt(entry.Overall_Experience)-1]++;
            newLocation.Wait_Time[parseInt(entry.Wait_Time)-1]++;
            newLocation.Registration[parseInt(entry.Registration)-1]++;
            newLocation.Service[parseInt(entry.Service)-1]++;
            newLocation.Timeframe[parseInt(entry.Timeframe)-1]++;
            newLocation.Resources[parseInt(entry.Resources)-1]++;
            newLocation.Comments.push(entry.Comments);
            results.push(newLocation);
            
        }
    });
    return results;
}

// Takes a data array and obtains and returns an array representing the total 
// feedback for every polling location in the data
function getTotalResponse(data) {
    let results = [0, 0, 0, 0, 0];
    for (let i=0; i<data.length; i++) {
        for (let j=0; j<5; j++) {
            results[j] += data[i].Overall_Experience[j]
        }
    }
    return results;
}

// Takes a data array and name representing the name of the polling location 
// and returns an index corresponding to that name in the data.
function getLocationIndex(data, name) {
    for (let i=0; i<data.length; i++) {
        let dataUpper = (data[i].PollingLocation).toUpperCase();
        let nameUpper = (name).toUpperCase();
        if (dataUpper == nameUpper) {
            return i;
        }
    }
    return -1;
}

// Takes a given chart and removes it
function removeData(chart) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = [];
    });
    chart.update();
}

// Takes a chart and data array to present and a title for the chart and updates the chart 
function addData(chart, data, title) {
    chart.data.datasets.forEach((dataset) => {
        dataset.data = data;
    });
    chart.options.title.text = title;
    chart.update();
}

// Takes a data array and name representing the name of the specified polling location and
// creates the charts for it.
function createCharts(data, name) {
    let locationIndex = getLocationIndex(data, name);
    let qNames = Object.keys(data[locationIndex]); 
    // Allows the user to add new charts to compare difference feedback options against eachother
    // after clicking the Add Chart button
    $('#add-chart').on('click', () => {
        createChart(data, locationIndex, qNames, 1);
    });
    $('#analytics-container').empty();              // Remove all charts
    if (analyticsState.begin) {  
        for (let i=1; i<4; i++) {
            $('#analytics-container').append(createChart(data, locationIndex, qNames, i));
        }
    }
}

// Takes a data array representing the totals of each polling location and locationIndex 
// representing the index corresponding to the location in the data array, and qNames 
// representing the names of the various questions in the form, and an index representing the
// specified question in the qNames array. Creates and adds a new chart to the analytics
// section.
function createChart(data, locationIndex, qNames, index) {
    let newChart = $('<div>');
    newChart.addClass('chart');
    let options = $('<select>');
    let canvas = $('<canvas>');
    canvas.addClass('chart' + index);
    let ctx = canvas[0].getContext('2d');

    // Add options to allow the user to choose what data they want to display for the chart
    for (let j=1; j<7; j++) {
        let option = $('<option>');
        option.val(qNames[j]);
        option.text(qNames[j].replace('_', ' '));
        options.append(option);
    }
    options.val(qNames[index]);
    newChart.append(options);

    // Create button to allow user to remove the chart
    let removeChart = $(`<div class="input-group-append">
        <button type="button" class="btn btn-danger">
        <span class="fa fa-times" aria-label="remove"></span>
        </button></div>`)
    newChart.append(removeChart);
    newChart.append(canvas);
    $('#analytics-container').append(newChart);

    // Create chart
    let chart = new Chart(ctx, {
        // The type of chart 
        type: 'pie',
    
        // The data
        data: {
            labels: ["Very Poor", "Poor", "Fair", "Good", "Very Good"],
            datasets: [{
                backgroundColor: ['#FC8F6E', '#D7A44A', '#9DB756', '#5EC087', '#3EBEBF'],
                data: data[locationIndex][qNames[index]],
            }]
        },
    
        // Configuration options
        options: {
            title: {
                display: true,
                text: qNames[index].replace('_', ' '),
                fontSize: 20
            },
            animation: {
                animateScale: true,
                duration: 1000,
            },
            responsive: true,
            maintainAspectRatio: true,
            legend: {
                display: false
            },
        }
    });

    // Updates the chart when the user selects a new feedback option from the form to be displayed
    options.change( () => {
        let newData = data[locationIndex][qNames[qNames.indexOf(options.val())]];
        removeData(chart);
        addData(chart, newData, options.val().replace('_', ' '));
    });

    // Removes the chart when the user clicks on the remove button.
    removeChart.on('click', function(event) {
        let target = $(event.target);
        target.parents('.chart').remove();
    });    
}

// Creates the home chart to be displayed before the user has interacted with the page
function createHomeChart() {
    fetch("data/voter-feedback.csv")
    .then(response => response.text())
    .then(data => processResponses(Papa.parse(data, {header: true})))
    .then(analyticData => getTotalResponse(analyticData))
    .then(data => {
        let ctx = $('canvas')[0].getContext('2d');
        let chart = new Chart(ctx, {
            // The type of chart 
            type: 'pie',
        
            // The data 
            data: {
                labels: ["Very Poor", "Poor", "Fair", "Good", "Very Good"],
                datasets: [{
                    backgroundColor: ['#FC8F6E', '#D7A44A', '#9DB756', '#5EC087', '#3EBEBF'],
                    data: data,
                }]
            },
        
            // Configuration options
            options: {
                title: {
                    display: true,
                    text: "Overall Satisfaction",
                    fontSize: 20
                },
        
                animation: {
                    animateScale: true,
                    duration: 1000,
                },
                legend: {
                    display: false
                },
        
            }
        });

        // Creates a legend for the charts
        let legend = $('<div>');
        legend.attr('id', 'chart-legend');
        legend.addClass('legend');
        legend.html(chart.generateLegend());
        $('#analytics-header').append(legend);
    })
    .catch(error => console.log(error))
}
createHomeChart();