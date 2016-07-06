var places, autocomplete, initialLocation;
var browserSupportFlag =  new Boolean();

function initMap() {
  if(navigator.geolocation) {
    browserSupportFlag = true;
    navigator.geolocation.getCurrentPosition(function(position) {
      initialLocation = {
        center: {lat: position.coords.latitude, lng: position.coords.longitude},
        zoom: 5
      };
      renderMap();
    }, function() {
      handleNoGeolocation(browserSupportFlag);
    })
  }
  else {
    browserSupportFlag = false;
    handleNoGeolocation(browserSupportFlag);
  }

  function handleNoGeolocation(errorFlag) {
    if (errorFlag == true) {
      console.log("Geolocation service failed.");
    } else {
      console.log("Your browser doesn't support geolocation.");
    }
    initialLocation = {
      center: {lat: 37.1, lng: -95.7},
      zoom: 3
    };
    renderMap();
  }

}

function renderMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: initialLocation.zoom,
    center: initialLocation.center,
    mapTypeControl: false,
    panControl: false,
    zoomControl: false,
    streetViewControl: false
  });

  autocomplete = new google.maps.places.Autocomplete(
    (document.getElementById('autocomplete')), {
    types: ['(cities)']
  });
  places = new google.maps.places.PlacesService(map);

  autocomplete.addListener('place_changed', onPlaceChanged);


  function onPlaceChanged() {
    var place = autocomplete.getPlace();
    var scope = angular.element(document.getElementById("weather-container")).scope();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(6);
      console.log(place.geometry.location.lat());
      console.log(place.geometry.location.lng());
      console.log(place.formatted_address);
      scope.$apply(function () {
        scope.retrieveWeather(place.geometry.location);
      });
    } else {
      document.getElementById('autocomplete').placeholder = 'Enter a city';
    }
  }
}