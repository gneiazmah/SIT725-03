//Base Layer with Open Street Maps
var map;
map = new google.maps.Map(mapContainer, mapOptions);
  detectLocation();

  function detectLocation(){
    var options = { enableHighAccuracy: true, 
      maximumAge: 1000, timeout: 30000};
    //check if the browser supports geolocation
    if (window.navigator.geolocation) {
      //get current position
      window.navigator.geolocation.getCurrentPosition(
        drawLocationOnMap, 
        handleGeoloacteError, 
        options);
    } else {
      alert("Sorry, your browser doesn't seem to support geolocation :-(");
    }
  }
  
var baseMapLayer = new ol.layer.Tile({
  source: new ol.source.OSM()
});
//Construct the Map Object
var map = new ol.Map({
  target: 'map',
  layers: [ baseMapLayer],
  view: new ol.View({
          center: ol.proj.fromLonLat([80.2459,12.9860]),
          zoom: 15 //Initial Zoom Level
        })
});
//Set up an  Style for the marker note the image used for marker
var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {module:ol/style/Icon~Options} */ ({
      anchor: [0.5, 16],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      src: 'images/icon.png'
    }))
});
//Adding a marker on the map
var marker = new ol.Feature({
  geometry: new ol.geom.Point(
    ol.proj.fromLonLat([80.24586,12.9859])
  )
});
marker.setStyle(iconStyle);
var vectorSource = new ol.source.Vector({
  features: [marker]
});
var markerVectorLayer = new ol.layer.Vector({
  source: vectorSource,
});
// add style to Vector layer style map
map.addLayer(markerVectorLayer);

function updateCoordinate(item) { 
    // Structure of the input Item
    // {"Coordinate":{"Longitude":80.2244,"Latitude":12.97784}}    var featureToUpdate = marker;
    var coord = ol.proj.fromLonLat([item.Coordinate.Longitude, item.Coordinate.Latitude]);
    featureToUpdate.getGeometry().setCoordinates(coord);
}

var longlats =
[[80.24586,12.98598],
[80.24537,12.98597],
[80.24522,12.98596],
[80.24522,12.98614],
[80.24523,12.98626]]

var count = 1;
var item = {};
item.id = marker.getId;
item.Coordinate = {};
setInterval(function() {
  item.Coordinate.Longitude = longlats[count][0];
  item.Coordinate.Latitude = longlats[count][1];
  count++;
  updateCoordinate(item);
}, 5000);

app.get('/publish', function (req, res) {
    res.sendFile('public/publisher.html', {
        root: __dirname
    });
});