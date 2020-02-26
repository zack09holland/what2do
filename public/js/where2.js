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
    verified: false,
    valid: false
  },
  setDateValues: function() {
    var startDate = new Date();
    var dd = startDate.getDate();
    var mm = startDate.getMonth() + 1;
    var yyyy = startDate.getFullYear();
    var numberOfDaysToAdd = 7;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    $("#start").attr("value", yyyy + "-" + mm + "-" + dd);
    $("#start").attr("min", yyyy + "-" + mm + "-" + dd);
    $("#start").attr("max", yyyy + 1 + "-" + mm + "-" + dd);
    $("#end").attr("min", yyyy + "-" + mm + "-" + dd);
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
    dd = endDate.getDate();
    mm = endDate.getMonth() + 1;
    yyyy = endDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    $("#end").attr("value", yyyy + "-" + mm + "-" + dd);
    $("#end").attr("max", yyyy + 1 + "-" + mm + "-" + dd);
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

$(function() {
  that.where2Application.setDateValues();
});

$("#Search").on("click", function() {
  if (that.where2Application.searchParams.valid) {
    userSearch(that.where2Application.searchParams);
    $("#loader-wrapper").css("visibility", "visible");
    $("#loader-wrapper .loader-section").css("visibility", "visible");

    $("#contentDetails").hide();
    that.where2Application.searchParams.start = $("#start")
      .val()
      .trim();
    that.where2Application.searchParams.end = $("#end")
      .val()
      .trim();
    that.where2Application.searchParams.radius = $("#radius")
      .val()
      .trim();
    // that.where2Application.zomatoApis.queryZomatoCities();
    // that.where2Application.eventbriteAPI.queryEventbrite();
    that.where2Application.yelpAPI.queryYelp();
    // displayFixes();
    // document.getElementById("filler").style.height = "200px";

    window.location.replace(
      "/results?destination=" +
        that.where2Application.searchParams.destination +
        "&start=" +
        that.where2Application.searchParams.start +
        "&end=" +
        that.where2Application.searchParams.end +
        "&lat=" +
        that.where2Application.searchParams.lat +
        "&lng=" +
        that.where2Application.searchParams.lng +
        "&radius=" +
        that.where2Application.searchParams.radius
    );
  }
});

$("#Console").on("click", function() {
  if (that.where2Application.searchParams.valid) {
    $("#contentDetails").hide();
    that.where2Application.searchParams.start = $("#start")
      .val()
      .trim();
    that.where2Application.searchParams.end = $("#end")
      .val()
      .trim();
    that.where2Application.searchParams.radius = $("#radius")
      .val()
      .trim();
    // that.where2Application.zomatoApis.queryZomatoCities();
    // that.where2Application.eventbriteAPI.queryEventbrite();
    // that.where2Application.yelpAPI.queryYelp();
    // displayFixes();
    // document.getElementById("filler").style.height = "200px";
    userSearch(that.where2Application.searchParams);
  }
});

function userSearch(searchParams) {
  console.log("We are About to Search");
  console.log(searchParams);
  $.get("/api/search", searchParams)
    .then(function(data) {
      if (data) {
        console.log("OMG the Server Returned Something:");
        console.log(data);
      }
      //window.location.replace("/results");
      // If there's an error, handle it by throwing up a bootstrap alert
    })
    .catch(function(err) {
      console.log(err);
    });
}

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
