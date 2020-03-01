$(document).ready(function() {
  if (decodeURIComponent(getUrlVars().destination)) {
    var destination = decodeURIComponent(getUrlVars().destination);
    $("#locationAutocomplete").attr("value", destination);
    console.log($("#locationAutocomplete").attr("value", destination))
    console.log(destination)
  }
  $("#favorites-container, #itineraries-container").hide();
  // $("results-card").hide();
  // setTimeout(function() {
  //   $("body").addClass("loaded");
  //   $("h1").css("color", "#222222");
  // }, 2000);
});

$(".theFavorites").click(function() {
  var index = $(".theFavorites").index(this);
  console.log(index)
  var start = decodeURIComponent(getUrlVars().start);
  var end = decodeURIComponent(getUrlVars().end);
  var destination = decodeURIComponent(getUrlVars().destination);
  var eventDate = $("#eventDate"+index).text();
  
  var radius = decodeURIComponent(getUrlVars().end);
  var eventName = $("#eventName"+index).text();
  var eventImg = $("#eventImg"+index).attr("src");
  var eventURL = $("#eventURL"+index).attr("href");
  // console.log(eventImg)
  // console.log(eventURL)
  
  var object = {
    favoriteDestination: destination,
    favoriteEventDate: eventDate,
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
