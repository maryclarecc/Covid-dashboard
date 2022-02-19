// // Map

const urlmap = 'https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/main/Resources/data_map.json'
Highcharts.getJSON(urlmap, function (data) {

    // Make codes uppercase to match the map data
    // data.forEach(function (p) {
    //     p.code = p.code.toUpperCase();
    // });

    // Instantiate the map

   // console.log(data)

    Highcharts.mapChart('map', {

        chart: {
            map: 'countries/us/us-all',
            borderWidth: 1
        },

        title: {
            text: 'COVID Vaccine Rates by State on 12/31/2021'
        },

        exporting: {
            sourceWidth: 600,
            sourceHeight: 500
        },

        legend: {
            layout: 'horizontal',
            borderWidth: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            floating: true,
            verticalAlign: 'top',
            y: 25
        },

        mapNavigation: {
            enabled: true
        },

        colorAxis: {
            min: 1,
            type: 'logarithmic',
            minColor: '#EEEEFF',
            maxColor: '#000022',
            stops: [
                [0, '#EFEFFF'],
                [0.67, '#4444FF'],
                [1, '#000022']
            ]
        },

        series: [{
            animation: {
                duration: 1000
            },
            data: data,
            joinBy: ['code', 'State Code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.code}'
            },
            name: 'Number of Vaccines',
            tooltip: {
                pointFormat: '{point.code}: {point.value}/km²'
            }
        }]
    });
});

// Time Series
// d3.csv("https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/199fd99295fa7fc95cd677017b63c3e9816294b4/Resources/Covid_Vaccine_data_US_formatted.csv", function(err, rows){

  // function unpack(rows, key) {
  // return rows.map(function(row) { return row[key]; });
  // }


// d3.csv("https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/199fd99295fa7fc95cd677017b63c3e9816294b4/Resources/Covid_Vaccine_data_US_formatted.csv")


// const linedata = "../Resources/line.js"
// const url = "https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/199fd99295fa7fc95cd677017b63c3e9816294b4/Resources/Covid_Vaccine_data_US_formatted.csv"
// d3.csv(url).then(function(data){ 
//   console.log(data)
//   function unpack(data, key) {
//       return data.map(function(data) { return data[key]; });
//     }

const urlline = "https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/main/Resources/data_line.json"
d3.json(urlline).then(function(data) {

  linedate = data.Date
  admindaily = data.Administered_Daily
  console.log(data)
  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'Daily Vaccines in US',
    x: linedate,
    y: admindaily,
    line: {color: '#17BECF'}
  }

  var data = [trace1];

  var layout = {
    title: 'Daily Vaccines in the US',
    xaxis: {
      // autorange: true,
      range: ['2020-12-31', '2022-02-10'],
      rangeselector: {buttons: [
          {
            count: 6,
            label: '6m',
            step: 'month',
            stepmode: 'backward'
          },
          {
            count: 12,
            label: '1y',
            step: 'month',
            stepmode: 'backward'
          },
          // {step: 'all'}
        ]},
      rangeslider: {range: ['2020-12-31', '2022-02-10']},
      type: 'date'
    },
    yaxis: {
      autorange: true,
      range: [0, 2000000],
      type: 'linear'
    }
  };

  Plotly.newPlot('line', data, layout);


})


const urlbar = "https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/main/Resources/data_stacked_bar.json"
function makeplot() {
  d3.json(urlbar).then(function(data){ 
    processData(data) 
  });
};

function processData(allRows) {

  var x = [], y1 = [], y2 = [], y3 = [], yall = [];

  for (var i=0; i<allRows.length; i++) {
    row = allRows[i];
    x.push( row['State Code'] );
    yall.push( row['Administered_Daily'] );
    y1.push( row['Administered_Pfizer_Daily']);
    y2.push( row['Administered_Moderna_Daily']);
    y3.push( row['Administered_Janssen_Daily']);
  }
  makePlotly( x, y1, y2, y3);
}

function makePlotly( x, y1, y2, y3){
  var plotDiv = document.getElementById("plot");
 
  // var trace1 = {
  //   x: x,
  //   y: yall,
  //   name: 'All Vaccines',
  //   type: 'bar'
  // };
      
  var trace2 = {
    x: x,
    y: y1,
    name: 'Pfizer',
    type: 'bar'
  };

  var trace3 = {
    x: x,
    y: y2,
    name: 'Moderna',
    type: 'bar'
  };

  var trace4 = {
    x: x,
    y: y3,
    name: 'Janssen',
    type: 'bar'
  };
  
      var data = [trace2, trace3, trace4];
      
      var layout = {barmode: 'stack'};
      
      Plotly.newPlot('stacked_bar', data, layout);
};

makeplot();


d3.json(urlmap).then(function(data) {
  console.log(Object.keys(data));
})

d3.json(urlline).then(function(data) {
  console.log(Object.keys(data));
})

d3.json(urlbar).then(function(data) {
  console.log(Object.keys(data));
})