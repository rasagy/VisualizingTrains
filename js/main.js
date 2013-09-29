var w=700;
var h=700;

var metro = new Array();
metro["Delhi"] = [77.2249600,28.6353080];
metro["Mumbai"] = [72.8776559,19.0759837];
metro["Kolkata"] = [88.3638950,22.5726460];
metro["Chennai"] = [80.2508246,13.0524139];

var xScale = 17, yScale = 18;
var xPadding = 1152, yPadding = 27;


var svg = d3.select("#svg-c")
			.append("svg")
			.attr("width",w)
			.attr("height",h);

var myData;
d3.csv("./data/Metro-trains.csv", function(error,data) {
  if (error) {  
  	//If error is not null, something went wrong.
		console.log(error);  //Log the error.
  } else {      
    //If no error, the file loaded correctly. Yay!
    console.log("Dataset loaded!");
    // console.log(data[0].Scene+ " "+data[10].Day);   //Log the data.
	 	console.log(data); 
	 	// return data; 
	 	// myData = data.map(function(d) { return [ +d["Scene"], d["Day"] ]; });
	 	// console.log(myData);   //Log the data.
	 	generateViz(data);				 	
		}
 });

function generateViz(data) {				

	var connected = svg.selectAll("path")
											.data(data)
											.enter()
											.append("path")
											.attr({
												d: function(d,i) {
													switch (d.from_station_gen) {
														case "Delhi":
															// console.log("Delhi!");
															console.log("M "+rX(metro['Delhi'][0])+" "+rY(metro['Delhi'][1])+" L"+rX(d.long)+" "+rY(d.lat))
															return "M "+rX(metro['Delhi'][0])+" "+rY(metro['Delhi'][1])+" L"+rX(d.long)+" "+rY(d.lat);
															break;
														case "Mumbai":
															// console.log("Delhi!");
															console.log("M "+rX(metro['Mumbai'][0])+" "+rY(metro['Mumbai'][1])+" L"+rX(d.long)+" "+rY(d.lat))
															return "M "+rX(metro['Mumbai'][0])+" "+rY(metro['Mumbai'][1])+" L"+rX(d.long)+" "+rY(d.lat);
															break;
														case "Chennai":
															// console.log("Delhi!");
															console.log("M "+rX(metro['Chennai'][0])+" "+rY(metro['Chennai'][1])+" L"+rX(d.long)+" "+rY(d.lat))
															return "M "+rX(metro['Chennai'][0])+" "+rY(metro['Chennai'][1])+" L"+rX(d.long)+" "+rY(d.lat);
															break;
														case "Kolkata":
															// console.log("Delhi!");
															console.log("M "+rX(metro['Kolkata'][0])+" "+rY(metro['Kolkata'][1])+" L"+rX(d.long)+" "+rY(d.lat))
															return "M "+rX(metro['Kolkata'][0])+" "+rY(metro['Kolkata'][1])+" L"+rX(d.long)+" "+rY(d.lat);
															break;
														default:
															console.log("Not a metro");
															break;
													}
												},
												'fill': 'none',
												'opacity': 0.2,
												'stroke': function(d,i) {
													switch (d.from_station_gen) {
														case "Delhi":
														return "hsl(0,80%,70%)";
														break;
														case "Mumbai":
														return "hsl(100,80%,70%)";
														break;
														case "Chennai":
														return "hsl(150,80%,70%)";
														break;
														case "Kolkata":
														return "hsl(250,80%,70%)";
														break;
														default: 
														return "hsl(200,80%,70%)";

														break;
													}
												},
												'stroke-width': "1",
												//'stroke-dasharray': "1, 3000"
											})
											.on("mouseover", function(d) {
										        console.log(d.to_station_name + "("+d.long+","+d.lat);
										});

	var stations = svg.selectAll("circles")
										.data(data)
										.enter()
										.append("circle")
										.attr({
											cx: function(d, i) {
												return rX(d.long);
											},
											cy: function(d, i) {
												return rY(d.lat);
											},
											r: 2, 
											fill: "rgb(50,50,50)",
											opacity: 0.1,
										}); 
}

function rX(coord) {
	return coord*xScale-xPadding;
}

function rY(coord) {
	return h-(coord*yScale)-yPadding;
}