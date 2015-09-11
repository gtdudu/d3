// mongoimport -h localhost:3001 --db meteor --drop --collection alpha --type csv --file public/data.csv --headerline


Alpha = new Meteor.Collection("alpha");

if (Meteor.isClient) {

  Meteor.subscribe('donnee')

myfunction = function(e) {
  obj = Alpha.findOne({letter: e.id});
  var l = document.getElementById("l");
  l.innerHTML = e.id;
  var f = document.getElementById("f");
  f.innerHTML = obj.frequency;
}

  Template.d3.onRendered(function(){

    var self = this;

    self.autorun(function() {
      var elem = document.getElementById("one");
      if (elem)
        elem.parentNode.removeChild(elem);

          var margin = {top: 20, right: 20, bottom: 30, left: 40},
              width = 960 - margin.left - margin.right,
              height = 500 - margin.top - margin.bottom;

          var x = d3.scale.ordinal()
              .rangeRoundBands([0, width], .1);

          var y = d3.scale.linear()
              .range([height, 0]);

          var xAxis = d3.svg.axis()
              .scale(x)
              .orient("bottom");

          var yAxis = d3.svg.axis()
              .scale(y)
              .orient("left")
              .ticks(10, "%");

          var svg = d3.select("body").append("svg")
              .attr("width", width + margin.left + margin.right)
              .attr("height", height + margin.top + margin.bottom)
              .attr("id", "one")
            .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

              data = Alpha.find({}, { sort: { letter : 1 }}).fetch()

            x.domain(data.map(function(d) { return d.letter; }));
            y.domain([0, d3.max(data, function(d) { return d.frequency; })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .call(xAxis);

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
              .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 6)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Frequency");

            svg.selectAll(".bar")
                .data(data)
              .enter().append("rect")
                .attr("class", "bar")
                .attr("id", function(d) { return d.letter})
                .attr("onclick", 'myfunction(this)')
                .attr("x", function(d) { return x(d.letter); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.frequency); })
                .attr("height", function(d) { return height - y(d.frequency); });
    });
  });

}

if (Meteor.isServer) {
  Meteor.publish("donnee", function() {
    return Alpha.find({})
  })
  Alpha.allow({
  'update': function (userId, doc, fields, modifier) {
    // can only change your own documents
    return true;
    }
  });


  Meteor.startup(function () {
    // code to run on server at startup
  });

}
