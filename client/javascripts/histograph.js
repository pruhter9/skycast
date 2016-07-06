var margin = {top: 20, right: 30, bottom: 30, left: 30};

var h = 250 - margin.top - margin.bottom;



function drawDailyGraph(data) {

var w = document.getElementById('daily-chart-container').offsetWidth - margin.left - margin.right;

var barWidth = w / (data.length);

var highTemp = d3.max(data, function(d) { return d.temperatureMax; }),
    lowTemp = d3.min(data, function(d) { return d.temperatureMin; }),
    maxGraphVal = highTemp + (20 - (highTemp % 20)),
    minGraphVal = (lowTemp % 20) <= 10 ? lowTemp - (lowTemp % 20) - 20 : lowTemp - (lowTemp % 20),
    minMax = maxGraphVal - minGraphVal;

var y = d3.scale.linear()
    .domain([minGraphVal, maxGraphVal])
    .range([h, 0]);

var x = d3.scale.ordinal()
    .domain(data.map(function(d) { return d.time; }))
    .rangeRoundBands([0, w]);


var xAxis = d3.svg.axis()
    .scale(x)
    .ticks(data, function(d) { return d.time; })
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks((maxGraphVal-minGraphVal) / 10)
    .orient("left");

var chart = d3.select("#daily")
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom);

var bar = chart.selectAll("g")
    .data(data, function(d) { return d.temperatureMax; })
  .enter().append("g")
    .attr("transform", function(d, i) {
      return "translate(" + (i * barWidth) + "," + margin.top + ")";
    });

bar.append("rect")
    .attr("height", function(d) {
      var offset = 1 - ((d.temperatureMax - minGraphVal)/minMax);
      var lowQuot = ((d.temperatureMin - minGraphVal)/minMax);
      return h * (1 - offset - lowQuot);
    })
    .attr("width", barWidth - 1)
    .attr("transform", function(d) {
      var offset = (1 - (d.temperatureMax - minGraphVal)/minMax);
      return "translate(" + margin.left + ", " + (h * offset) + ")";
    });

bar.append("rect")
    .attr("height", function(d) {
      var lowQuot = ((d.temperatureMin - minGraphVal)/minMax);
      return lowQuot * h;
    })
    .attr("width", barWidth - 1)
    .attr("class", "lowTemp")
    .attr("transform", function(d) {
      var lowQuot = 1 - ((d.temperatureMin - minGraphVal)/minMax);
      return "translate(" + margin.left + ", " + h * lowQuot + ")";
    });


bar.append("text")
    .attr("x", (barWidth / 2) + margin.left - 10)
    .attr("y", function(d) { return h * (1 - ((d.temperatureMax - minGraphVal)/minMax)) + 14; })
    .attr("dy", ".25em")
    .text(function(d) { return Math.floor(d.temperatureMax); });

bar.append("text")
    .attr("x", (barWidth / 2) + margin.left - 10)
    .attr("y", function(d) { return h - 10; })
    .attr("dy", ".25em")
    .text(function(d) { return Math.floor(d.temperatureMin); });

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(" + margin.left + "," + (h + margin.top) + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
      .call(yAxis);

};


/***************************
****************************

HOURLY GRAPH

****************************
***************************/

function drawHourlyGraph(hrData) {

hrData.forEach(function(d){ d.time = new Date(d.time * 1000) });

var w = document.getElementById('hourly-chart-container').offsetWidth - margin.left - margin.right;

var highTemp = d3.max(hrData, function(d) { return d.temperature; }),
    lowTemp = d3.min(hrData, function(d) { return d.temperature; }),
    maxGraphVal = highTemp + (10 - (highTemp % 10)),
    minGraphVal = lowTemp - (lowTemp % 10),
    minMax = maxGraphVal - minGraphVal;


var x = d3.time.scale()
    .range([0, w])
    .domain(d3.extent(hrData, function(d) { return d.time; }));

var y = d3.scale.linear()
    .domain([minGraphVal, maxGraphVal])
    .range([h, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .ticks((maxGraphVal-minGraphVal) / 10)
    .orient("left");


var line = d3.svg.line()
          .interpolate('cardinal')
          .x(function(d) {
            return x(d.time);
          })
          .y(function(d) {
            return y(d.temperature);
          });

var chart = d3.select("#hourly")
    .datum(hrData)
    .attr("width", w + margin.left + margin.right)
    .attr("height", h + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

chart.append("path")
    .attr("class", "line")
    .attr("d", line);

chart.selectAll('.point')
   .data(hrData)
   .enter().append("svg:circle")
   .attr("cx", function(d, i) { return x(d.time); })
   .attr("cy", function(d) { return y(d.temperature); })
   .attr('r', 2);

    chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0, " + h + ")")
      .call(xAxis);

    chart.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate(0, 0)")
      .call(yAxis);

}