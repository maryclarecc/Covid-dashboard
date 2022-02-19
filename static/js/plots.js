// // Map

const urlmap = 'https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/main/Resources/data_map2.json'
Highcharts.getJSON(urlmap, function (mapdata) {

    // Make codes uppercase to match the map data
    // mapdata.forEach(function (p) {
    //     p.code = p['code'].toUpperCase();
    // });

    // console.log(mapdata)
    Highcharts.mapChart('map', {

        chart: {
            map: 'countries/us/us-all',
            borderWidth: 0
        },

        title: {
            text: 'Daily COVID Vaccine Rates by State on 12/31/2021'
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
            data: mapdata,
            joinBy: ['postal-code', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.code}'
            },
            name: 'Number of Vaccines Daily',
            tooltip: {
                pointFormat: '{point.value}'
            }
        }]
    });
});


// Time Series
const urlline = "https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/main/Resources/data_line.json"
d3.json(urlline).then(function(data) {

  linedate = Object.values(data.Date)
  admindaily = Object.values(data.Administered_Daily)
  
  linedate2 = linedate.map(i => Date.parse(i))
  
  // let linedate = data.map(i => i.Date)
  // console.log(linedate2)
  // console.log(admindaily)

  // console.log(data)
  var trace1 = {
    type: "scatter",
    mode: "lines",
    name: 'Daily Vaccines in US',
    x: linedate2,
    y: admindaily,
    line: {color: '#17BECF'}
  }

  var data2 = [trace1];

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

  Plotly.newPlot('line', data2, layout);
// console.log(data.Date)
// console.log(Object.values(data.Date))
})


// Bar Chart
const urlbar = "https://raw.githubusercontent.com/maryclarecc/Covid-dashboard/main/Resources/data_stacked_bar.json"

d3.json(urlbar).then(function(databar) {

  x = Object.values(databar['State Code'])
  y1= Object.values(databar.Administered_Pfizer_Daily)
  y2= Object.values(databar.Administered_Moderna_Daily)
  y3= Object.values(databar.Administered_Janssen_Daily)

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
  

  Plotly.newPlot('stacked_bar', data, layout)
});
