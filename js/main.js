var w=800;
var h=600;

var metro = new Array();
metro["Delhi"] = [77.2249600,28.6353080];
metro["Mumbai"] = [72.8776559,19.0759837];
metro["Kolkata"] = [88.3638950,22.5726460];
metro["Chennai"] = [80.2508246,13.0524139];

var metroColors = new Array();
metroColors[0]="hsl(0,90%,80%)"; metroColors[1]="hsl(120,80%,70%)"; metroColors[2]="hsl(50,100%,60%)"; metroColors[3]="hsl(220,80%,70%)"; //First Set
// metroColors[0]="#FC8D62"; metroColors[1]="#8DA0CB"; metroColors[2]="#EEC92F"; metroColors[3]="#A6D854"; //Set2
// metroColors[0]="#1B9E77"; metroColors[1]="#D95F02"; metroColors[2]="#7570B3"; metroColors[3]="#E7298A"; //Dark2
// metroColors[0]="#1F78B4"; metroColors[1]="#33A02C"; metroColors[2]="#E31A1C"; metroColors[3]="#FF7F00"; //Paired

//Custom scale to fit underlying map
var xScale = 17, yScale = 18;
var xPadding = 1152, yPadding = -73;


var initDelay = 1000;  //Initial Delay before starting
var aDelay=75;  //Delay
var aSpeed=2;		 //Less is more!

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
    console.log(data); 
    // return data; 
    generateViz(data);           
    }
 });

function generateViz(data) {        

  var connected = svg
  	.selectAll("path")
    .data(data)
    .enter()
    .append("path")
    .attr({
      d: function(d,i) {
        switch (d.from_station_gen) {
          case "Delhi":
            // console.log("M "+rX(metro['Delhi'][0])+" "+rY(metro['Delhi'][1])+" L"+rX(d.long)+" "+rY(d.lat))
            return "M "+rX(metro['Delhi'][0])+" "+rY(metro['Delhi'][1])+" L"+rX(d.long)+" "+rY(d.lat);
            break;
          case "Mumbai":
            // console.log("M "+rX(metro['Mumbai'][0])+" "+rY(metro['Mumbai'][1])+" L"+rX(d.long)+" "+rY(d.lat))
            return "M "+rX(metro['Mumbai'][0])+" "+rY(metro['Mumbai'][1])+" L"+rX(d.long)+" "+rY(d.lat);
            break;
          case "Chennai":
            // console.log("M "+rX(metro['Chennai'][0])+" "+rY(metro['Chennai'][1])+" L"+rX(d.long)+" "+rY(d.lat))
            return "M "+rX(metro['Chennai'][0])+" "+rY(metro['Chennai'][1])+" L"+rX(d.long)+" "+rY(d.lat);
            break;
          case "Kolkata":
            // console.log("M "+rX(metro['Kolkata'][0])+" "+rY(metro['Kolkata'][1])+" L"+rX(d.long)+" "+rY(d.lat))
            return "M "+rX(metro['Kolkata'][0])+" "+rY(metro['Kolkata'][1])+" L"+rX(d.long)+" "+rY(d.lat);
            break;
          default:
            console.log("Not a metro!");
            break;
        }
      },
      'fill': 'none',
      'opacity': 0.2,
      'stroke': function(d,i) {
        switch (d.from_station_gen) {
          case "Delhi":
          return metroColors[0];
          break;
          case "Mumbai":
          return metroColors[1];
          break;
          case "Chennai":
          return metroColors[2];
          break;
          case "Kolkata":
          return metroColors[3];
          break;
          default: 
          return "#555";
          break;
        }
      },
      'stroke-width': "1",
      'stroke-dasharray': "1, 500"
    })
    .on("mouseover", function(d) {    	
    	coord = d3.mouse(this);
      console.log(d.to_station_name + "("+d.long+","+d.lat+") / "+coord[0]+","+coord[1]);
      msg="<b>"+d.name+"</b><br>From <i>"+d.from_station_name+"</i> to <i>"+d.to_station_name+"</i>";
      showTip(msg,coord[0],coord[1]);
      
      d3.select(this)
	      .attr({
	      	'opacity': "0.8",
	      	'stroke-width': "2",
	    	});
    })
    .on("mouseout", function() {
      d3.select(this)
	      .attr({
	      	'opacity': "0.2",
	      	'stroke-width': "1",
	    	});
	    	// document.getElementById('m-tip').style.opacity=0.8;
    })
    .transition()
    .duration(function(d,i) {return i*aSpeed + 500;}) //Instead of d.distance*aSpeed+aDelay/aSpeed;
    .ease("linear")
    .delay(function(d,i) {return i*aDelay + initDelay;})
    .attr({
      'stroke-dasharray': "500, 1"
    });

  var stations = svg
  	.selectAll("circles")
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
      r: 1.5, 
      fill: "rgb(50,50,50)",
      opacity: 0,
    })
    .transition()
    .duration(function(d) {return 5;})
    .ease("linear")
    .delay(function(d,i) {return i*aDelay + initDelay;})
    .attr({
    	'opacity': "0.1"
    });
}

function showTip(text,x,y) {
	var tip=document.getElementById('m-tip');
	tip.innerHTML=text;
	tip.style.opacity=1;	
	tip.style.left=(x+10)+"px";
	tip.style.top=(y+20)+"px";
	//setTimeout(function () {}, 500);
}

function rX(coord) {
  return coord*xScale-xPadding;
}

function rY(coord) {
  return h-(coord*yScale)-yPadding;
}