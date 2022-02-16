// Map
Highcharts.getJSON('https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/us-population-density.json', function (data) {

    // Make codes uppercase to match the map data
    data.forEach(function (p) {
        p.code = p.code.toUpperCase();
    });

    // Instantiate the map
    Highcharts.mapChart('map', {

        chart: {
            map: 'countries/us/us-all',
            borderWidth: 1
        },

        title: {
            text: 'US population density (/km²)'
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
            joinBy: ['postal-code', 'code'],
            dataLabels: {
                enabled: true,
                color: '#FFFFFF',
                format: '{point.code}'
            },
            name: 'Population density',
            tooltip: {
                pointFormat: '{point.code}: {point.value}/km²'
            }
        }]
    });
});

// Time Series
d3.csv("https://github.com/maryclarecc/Covid-dashboard/blob/199fd99295fa7fc95cd677017b63c3e9816294b4/Resources/Covid_Vaccine_data_US_formatted.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


var trace1 = {
  type: "scatter",
  mode: "lines",
  name: 'Daily Vaccines in US',
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'Administered_Daily'),
  line: {color: '#17BECF'}
}

// var trace2 = {
//   type: "scatter",
//   mode: "lines",
//   name: 'AAPL Low',
//   x: unpack(rows, 'Date'),
//   y: unpack(rows, 'AAPL.Low'),
//   line: {color: '#7F7F7F'}
// }

var data = [trace1];

var layout = {
  title: 'Daily Vaccines in the US',
  xaxis: {
    autorange: true,
    range: ['2020-12-31', '2022-02-10'],
    rangeselector: {buttons: [
        {
          count: 1,
          label: '1m',
          step: 'month',
          stepmode: 'backward'
        },
        {
          count: 6,
          label: '6m',
          step: 'month',
          stepmode: 'backward'
        },
        {step: 'all'}
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


// Stacked Bar Chart
var trace1 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [20, 14, 23],
    name: 'SF Zoo',
    type: 'bar'
  };
  
  var trace2 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [12, 18, 29],
    name: 'LA Zoo',
    type: 'bar'
  };

  var trace3 = {
    x: ['giraffes', 'orangutans', 'monkeys'],
    y: [12, 18, 29],
    name: 'LA Zoo',
    type: 'bar'
  };
  
  var data = [trace1, trace2, trace3];
  
  var layout = {barmode: 'stack'};
  
  Plotly.newPlot('stacked_bar', data, layout);