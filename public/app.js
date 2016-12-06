(function() {

  var mainMap = null;

  var init = function() {

    var favsDataString = localStorage.favouritesData;
    var favsData = favsDataString ? JSON.parse( favsDataString ) : [];
    populateFavouritesList( favsData );

    var mapContainer = document.getElementById( 'map-container' );
    var center = { lat: 51.5, lng: -0.1227758 };
    var zoom = 10;
    mainMap = new MapWrapper( mapContainer, center, zoom );
    mainMap.addMarker({ lat: 51.5, lng: -0.12 });

    mainMap.addListener( 'center_changed', handleCentreChanged );

    handleCentreChanged();

    var addFavouriteButton = document.getElementById( 'add-favourite-button' );
    addFavouriteButton.onclick = handleAddFavourite;

    var latLngButton = document.getElementById( 'lat-lng-button' );
    latLngButton.onclick = handleLatLngButtonClick;

    var form = document.querySelector( 'form' );
    form.onsubmit = function( ev ) {
      ev.preventDefault();
      return false;
    };

    var whereAmIButton = document.getElementById( "where-am-i-button" );

    if ( "geolocation" in navigator ) {
      whereAmIButton.disabled = false;
      whereAmIButton.onclick = handleWhereAmIClick;
    }
    else {
      whereAmIButton.disabled = true;
    }
  };

  var populateFavouritesList = function( favouritesData ) {

    favouritesData.forEach( function( favourite ) {
      addFavourite( favourite.name, favourite.location );
    } );
  };

  var handleAddFavourite = function() {
    var mapLocation = mainMap.map.getCenter();
    var location = { lat: mapLocation.lat(), lng: mapLocation.lng() };
    var favouriteNameInput = document.getElementById( 'favourite-name-input' );
    var favouriteName = favouriteNameInput.value;

    if ( favouriteName !== "" ) {
      addFavourite( favouriteName, location );
      saveFavourite( favouriteName, location );
    }
  };

  var addFavourite = function( name, location ) {

    var nameTd = document.createElement( 'td' );
    nameTd.innerText = name;
    var latTd = document.createElement( 'td' );
    latTd.innerText = location.lat.toFixed( 3 );
    var lngTd = document.createElement( 'td' );
    lngTd.innerText = location.lng.toFixed( 3 );

    var tr = document.createElement( 'tr' );
    tr.appendChild( nameTd );
    tr.appendChild( latTd );
    tr.appendChild( lngTd );

    var favouritesTable = document.getElementById( 'favourites-table' );
    favouritesTable.appendChild( tr );
  };

  var saveFavourite = function( name, location ) {

    var favsDataString = localStorage.favouritesData;
    var favsData = favsDataString ? JSON.parse( favsDataString ) : [];
    favsData.push({ name: name, location: location });
    localStorage.favouritesData = JSON.stringify( favsData );
  };

  var handleCentreChanged = function() {

    var locationDisplay = document.getElementById( 'location-display' );
    locationDisplay.innerText = mainMap.getCenter();
  };

  var handleLatLngButtonClick = function() {
    var latString = document.getElementById( 'lat-input' ).value;
    var lngString = document.getElementById( 'lng-input' ).value;
    var lat = parseFloat( latString );
    var lng = parseFloat( lngString );

    if (
      lat !== NaN &&
      lng !== NaN &&
      lat >= -90 &&
      lat <= 90 &&
      lng >= -180 &&
      lng <= 180 ) {
      mainMap.setCenter({ lat: lat, lng: lng });
    }
  };

  var handleWhereAmIClick = function() {
    navigator.geolocation.getCurrentPosition( function( position ) {
      mainMap.setCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  };

  window.onload = init;
})();
