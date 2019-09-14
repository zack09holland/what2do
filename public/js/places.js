var that = this;
var where2Application = {
  searchParams: {
    start: "",
    end: "",
    destination: "",
    destinationArray: [],
    city: "",
    state: "",
    country: "",
    countryLongName: "",
    radius: 0,
    lat: 0,
    lng: 0,
    verified: false
  }
};

//Google Places Autocomplete Location Code with our Application Variable:
var input = document.getElementById("locationAutocomplete");
var autocomplete = new google.maps.places.Autocomplete(input, {
  types: ["(cities)"]
});
google.maps.event.addListener(autocomplete, "place_changed", function() {
  var place = autocomplete.getPlace();
  if (place.place_id) {
    that.where2Application.searchParams.valid = true;
    that.where2Application.searchParams.destination = place.formatted_address;
    that.where2Application.searchParams.destinationArray = that.where2Application.searchParams.destination.split(
      ", "
    );
    if (that.where2Application.searchParams.destinationArray.length === 2) {
      that.where2Application.searchParams.city =
        that.where2Application.searchParams.destinationArray[0];
      that.where2Application.searchParams.country =
        that.where2Application.searchParams.destinationArray[1];
    } else {
      that.where2Application.searchParams.city =
        that.where2Application.searchParams.destinationArray[0];
      that.where2Application.searchParams.region =
        that.where2Application.searchParams.destinationArray[1];
      that.where2Application.searchParams.country =
        that.where2Application.searchParams.destinationArray[2];
    }
    that.where2Application.searchParams.lat = Number.parseFloat(
      place.geometry.location.lat()
    ).toFixed(4);
    that.where2Application.searchParams.lng = Number.parseFloat(
      place.geometry.location.lng()
    ).toFixed(4);
  } else {
    that.where2Application.searchParams.valid = false;
  }
});
