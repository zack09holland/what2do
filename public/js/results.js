$(document).ready(function() {
  if (decodeURIComponent(getUrlVars().destination)) {
    var destination = decodeURIComponent(getUrlVars().destination);
    $("#locationAutocomplete").attr("value", destination);
  }
  $("#favorites-container, #itineraries-container").hide();
  // $("results-card").hide();
  // setTimeout(function() {
  //   $("body").addClass("loaded");
  //   $("h1").css("color", "#222222");
  // }, 2000);
});

$(".theFavorites").click(function() {
  var destination = decodeURIComponent(getUrlVars().destination);
  var start = decodeURIComponent(getUrlVars().start);
  var end = decodeURIComponent(getUrlVars().end);
  var radius = decodeURIComponent(getUrlVars().end);
  
  var index = $(".theFavorites").index(this);
  console.log(index)
  var eventName = $("#eventName").closest("strong").text();
  var eventImg = $("#eventImg").attr("src");
  var eventURL = $("#eventURL").attr("href");
  var object = {
    favoriteDestination: destination,
    favoriteStartDate: start,
    favoriteEndDate: end,
    favoriteRadius: radius,
    favoriteImg: eventImg,
    favoriteUrl: eventURL,
    favoriteTitle: eventName
  };
  console.log(object);
  $.post("/api/favorites", object).then(function(data) {
    if (data) {
      console.log("OMG the Server Returned Something:");
      console.log(data);
    }
  });
  // Create a new entry in the db with the contents of the obj
  //...hard time figuring out how to pass the object values into this
});

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
