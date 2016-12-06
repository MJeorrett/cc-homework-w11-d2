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
    new google.maps.Marker({
      position: latLng,
      map: this.map
    });
  }
};
