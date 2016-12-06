var init = function() {
  var mapContainer = document.getElementById( 'map-container' );
  var center = { lat: 51.5, lng: -0.1227758 };
  var zoom = 10;
  var mainMap = new MapWrapper( mapContainer, center, zoom );
  mainMap.addMarker({ lat: 51.5, lng: -0.12 });
};

window.onload = init;
