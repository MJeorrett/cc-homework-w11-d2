var MapWrapper = function( container, center, zoom ) {
  this.map = new google.maps.Map(
    container,
    {
      center: center,
      zoom: zoom
    }
  );
};

MapWrapper.prototype = {
  addMarker: function( latLng ) {
    var marker = new google.maps.Marker({
      position: latLng,
      map: this.map
    });

    var infoWindow = new google.maps.InfoWindow({
      content: "lat: " + latLng.lat + " lng: " + latLng.lng
    });

    marker.addListener( 'click', function() {
      infoWindow.open( this.map, marker )
    }.bind( this ) );
  }
};
