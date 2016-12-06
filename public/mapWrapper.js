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
  },

  setCenter: function( latLng ) {
    this.map.setCenter( latLng );
  },

  addListener: function( listener, callback ) {
    this.map.addListener( listener, callback );
  },

  getCenter: function() {
    var center = this.map.getCenter();
    var lat = center.lat().toFixed( 3 );
    var lng = center.lng().toFixed( 3 );
    return "lat: " + lat + " lng: " + lng;
  }
};
