var link = document.createElement('link');
link.setAttribute('rel', 'stylesheet');
link.setAttribute('type', 'text/css');
link.setAttribute('href', '/priority-mail/map/pm_map.css');
document.getElementsByTagName('head')[0].appendChild(link);

dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("dijit.layout.AccordionContainer");
dojo.require("esri.map");
dojo.require("esri.layers.FeatureLayer");
dojo.require("esri.layers.graphics");
dojo.require("esri.renderer");
dojo.require("esri.tasks.gp");
dojo.require("esri.tasks.query");
dojo.require("dijit.form.Button");
dojo.require("esri.dijit.Print");
dojo.require("esri.symbols.PictureMarkerSymbol");
dojo.require("esri.symbols.SimpleMarkerSymbol");
dojo.require("esri.geometry.Point");
dojo.require("esri.graphic");
dojo.require("dojo.dom");
dojo.require("dojo.dom-construct");
dojo.require("dojo.domReady!");
dojo.require("esri.request");
dojo.require("esri.tasks.PrintTemplate");
dojo.require("esri.config");
dojo.require("dojo._base.array");
dojo.require("esri.arcgis.utils");
dojo.require("esri.layers.agsdynamic");
dojo.require("esri.layers.agstiled");
dojo.require("esri.geometry.Extent");
dojo.require("esri.layers.LOD");
dojo.require("esri.dijit.Legend");
dojo.require("esri.tasks.LegendLayer");


var map;
var bufferLayer;
var pinLayer;
var StandardsResults;
var origzip3;
var gp;
var lookupcount;
var currentZoom = 45254955.38108561;

function init(){
		
	lookupcount = 0;
		
	//buffer layer for lookup results
	bufferLayer = new esri.layers.GraphicsLayer({
   		id: "bufferLayer",
		opacity: 0.5
	});
	//dynamic map
    var psseLayerURL = "https://ssmap.//arcgis/rest/services/ServiceStandards/PMAP_Projected/MapServer";
    var psseLayer = new esri.layers.ArcGISDynamicMapServiceLayer(psseLayerURL, {
          id: "psseLayer",
		  opacity: 1.0	
    });
	//blue color layer
	var blueLayerUrl = "https://ssmap.//arcgis/rest/services/ServiceStandards/PMAP_ProjectedColor/MapServer";
  	var blueLayer = esri.layers.ArcGISDynamicMapServiceLayer(blueLayerUrl, { 
        id: "blueLayer",
		opacity: 1.0		
    });
	
	map = new esri.Map("mapDiv", { 
        center: [-98.34960937497242, 38.94989178680422],
        zoom: 1,
		maxScale:353554.3389147311,
		minScale:90509910.76217116,
		logo: false
	});
	
	map.addLayer(psseLayer,0);

	map.addLayer(blueLayer,1);	

	createPrintableButtonArea();
	
	//pin layer
	pinLayer = new esri.layers.GraphicsLayer({
   		id: "pinLayer"
	});

	map.addLayer(bufferLayer,2);

	map.addLayer(pinLayer, 3);
	
	createmapLegendDiv();
	
	createLoadingImgDiv();
	   
	dojo.connect(map, "onUpdateStart", function() {
    	esri.show(dojo.byId("loadingImg"));					 
    });
    dojo.connect(map, "onUpdateEnd", function() {
    	esri.hide(dojo.byId("loadingImg"));		
    });
	
	dojo.connect( map, "onZoomEnd", function(){	
		currentZoom = map.getScale();
	});
}


//Search with origination ZIP	
function execute(originationzip){
	//clear existing graphics 
	bufferLayer.clear();
	pinLayer.clear();
	
	if (lookupcount == 0) {		
		removeBlueColor();
		lookupcount = lookupcount + 1;
	}
	
    var origzip = originationzip;
	var classtype = "PRI";
    if (origzip.length > 3) {
        origzip3 = origzip.substr(0, 3);
    }
    else 
        if (origzip.length == 3) {
            origzip3 = origzip;
    }
	
	esri.show(dojo.byId("loadingImg"));
	
	gp = new esri.tasks.Geoprocessor("https://ssmap.//arcgis/rest/services/ServiceStandards/getStandardsMap2/GPServer/getStandardsMap");
	
    gp.setOutputSpatialReference({
        wkid: 102100
    });
    var params = {
        "orig_zip": origzip3,
		"std_class": classtype
    };
    gp.execute(params, displayResults, errorHandler);
}


function displayResults(results, messages){	
	esri.hide(dojo.byId("loadingImg"));
	
    var defaultSymbol = new esri.symbol.SimpleFillSymbol().setStyle(esri.symbol.SimpleFillSymbol.STYLE_NULL);
    defaultSymbol.outline.setStyle(esri.symbol.SimpleLineSymbol.STYLE_NULL);
    
    //create renderer
    var renderer = new esri.renderer.UniqueValueRenderer(defaultSymbol, "ORIGIN_ENTRY_T_PRI_NBR");
    //add symbol for each possible value
    renderer.addValue("01", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([0, 91, 150, 1.0])).setOutline(new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([118, 26, 18, 1.0])).setWidth(2)));
    renderer.addValue("02", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([75, 155, 185, 0.8])).setOutline(new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([118, 26, 18, 1.0])).setWidth(2)));
    renderer.addValue("03", new esri.symbol.SimpleFillSymbol().setColor(new dojo.Color([153, 199, 208, 0.8])).setOutline(new esri.symbol.SimpleLineSymbol().setColor(new dojo.Color([118, 26, 18, 1.0])).setWidth(2)));

    bufferLayer.setRenderer(renderer);

    StandardsResults = results[0].value.features;
    dojo.forEach(StandardsResults, function(feature){
		bufferLayer.add(feature); 
    });
	addPinLabel(origzip3);
}


function errorHandler(err){
    console.log('Oops, error: ', err);
	esri.hide(dojo.byId("loadingImg"));
}


function createPrintButtonArea() {
	var divTag = document.createElement("div");
 	divTag.id = "print_buttonmap";
 	document.getElementById("print_button").appendChild(divTag);
	document.getElementById("print_buttonmap").className = "claro";	
}


function createmapLegendDiv(){
 	var divTag = document.createElement("div");
 	divTag.id = "mapLegend";
 	document.getElementById("mapDiv_root").appendChild(divTag);
}


function createLoadingImgDiv(){
 	var divTag = document.createElement("div");
	 divTag.id = "loadingImg";
 	document.getElementById("mapDiv_root").appendChild(divTag);
}

function createPrintableButtonArea() {
	var btn = document.createElement("button"); 
	var btntext = document.createTextNode("Printable Map");
	btn.setAttribute("type", "submit");
	btn.appendChild(btntext);
	btn.onclick = printablemap;
	document.getElementById('print_button').appendChild(btn);
	document.getElementById('print_button').className = "buttonprint";		
}


function addPinLabel(origzip3) {
	//build query
	var queryTask3 = new esri.tasks.QueryTask("https://ssmap.//arcgis/rest/services/ServiceStandards/ZIP3_Labels2/MapServer/0");
	//build query filter
   	var query3 = new esri.tasks.Query();
	query3.where = "ZIP3 = '" + origzip3 + "'";
   	query3.returnGeometry = true;
   	query3.outFields = ["ZIP3"];
   	//execute query
   	queryTask3.execute(query3, addPinFeatureSetToMap, errorHandler);	
}


//adds pin image for the selected ZIP
function addPinFeatureSetToMap(featureSet) {
	var symbol =  new esri.symbol.PictureMarkerSymbol({
  	"url":"/priority-mail/map/Red-indicator.png",
 	 "height":30,
  	 "width":24,
  	 "yoffset": 25
	});
	var zipvalue;
	//Add pin to the graphics layer
	dojo.forEach(featureSet.features, function(feature) {
		zipvalue = feature.attributes.ZIP3;
		pinLayer.add(feature.setSymbol(symbol));
	});
}


// removes the map with blue color
function removeBlueColor() {
	map.removeLayer(map.getLayer(map.layerIds[1]));
	map.addLayer(bufferLayer,1);
	map.addLayer(pinLayer, 2);
}

//call the printable page
function printablemap(){
	
	var ZIPS = "ZIPS"
	if (origzip3 === undefined) {
    	var URL = "/priority-mail/map/map_print.html?zoomlevel="+currentZoom+"&ZIP="+ZIPS;
	} else {
   		var URL = "/priority-mail/map/map_print.html?zoomlevel="+currentZoom+"&ZIP="+origzip3;
	} 

	var win = window.open(URL, "map_print", 'width=915, height=800, scrollbars=yes,menubar=yes');
}

dojo.addOnLoad(init);