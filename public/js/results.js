$(document).ready(function () {
  if (decodeURIComponent(getUrlVars().destination)) {
    var destination = decodeURIComponent(getUrlVars().destination);
    $("#locationAutocomplete").attr("value", destination);
  }
  if (destination == "undefined") {
    $("#locationAutocomplete").attr("value", "");
  }
  $("#favorites-container, #itineraries-container").hide();
});

$(".eventFavorites").click(function () {
  var index = $(".eventFavorites").index(this);
  // console.log(index)
  var start = decodeURIComponent(getUrlVars().start);
  var end = decodeURIComponent(getUrlVars().end);
  var destination = decodeURIComponent(getUrlVars().destination);
  

  var eventName = $("#eventName" + index).text();
  var eventDate = $("#eventDate" + index).text().trim();
  var eventImg = $("#eventImg" + index).attr("src");
  var eventURL = $("#eventURL" + index).attr("href");
  var eventAddress = $("#eventAddress" + index).text().trim();

  var object = {
    favoriteType: "Event",
    address: eventAddress,
    favoriteDestination: destination,
    favoriteEventDate: eventDate,
    favoriteStartDate: start,
    favoriteEndDate: end,
    favoriteImg: eventImg,
    favoriteUrl: eventURL,
    favoriteTitle: eventName
  };
  // console.log(object);
  $.post("/api/favorites", object).then(function (data) {
    if (data) {
      // console.log("OMG the Server Returned Something:");
      // console.log(data);
    }
  });
  // Create a new entry in the db with the contents of the obj
  //...hard time figuring out how to pass the object values into this
});
$(".foodFavorites").click(function () {
  var index = $(".foodFavorites").index(this);
  // console.log(index)
  var start = decodeURIComponent(getUrlVars().start);
  var end = decodeURIComponent(getUrlVars().end);
  var destination = decodeURIComponent(getUrlVars().destination);

  var restaurantName = $("#restaurantName" + index).text();
  var restaurantAddress = $("#restaurantAddress" + index).text().trim();
  var yelpURL = $("#yelpURL" + index).attr("href");
  var imgURL = $("#imgURL" + index).attr("src");

  var object = {
    favoriteType: "Restaurant",
    favoriteDestination: destination,
    favoriteStartDate: start,
    favoriteEndDate: end,
    favoriteImg: imgURL,
    favoriteUrl: yelpURL,
    favoriteTitle: restaurantName,
    address: restaurantAddress
  };
  // console.log(object);
  $.post("/api/favorites", object).then(function (data) {
    if (data) {
      // console.log("OMG the Server Returned Something:");
      // console.log(data);
    }
  });
  // Create a new entry in the db with the contents of the obj
  //...hard time figuring out how to pass the object values into this
});

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    m,
    key,
    value
  ) {
    vars[key] = value;
  });
  return vars;
}
