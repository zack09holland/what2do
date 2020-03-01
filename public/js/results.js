$(document).ready(function() {
  if (decodeURIComponent(getUrlVars().destination)) {
    var destination = decodeURIComponent(getUrlVars().destination);
    $("#locationAutocomplete").attr("value", destination);
  }
  console.log(destination)
  if(destination == "undefined"){
    console.log(destination)
    $("#locationAutocomplete").attr("value", "");
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
  var radius = decodeURIComponent(getUrlVars().end);
  
  var eventName = $("#eventName"+index).text();
  var eventDate = $("#eventDate"+index).text().trim();
  var eventImg = $("#eventImg"+index).attr("src");
  var eventURL = $("#eventURL"+index).attr("href");

  var restaurantName = $("#restaurantName"+index).text();
  var restaurantAddress = $("#restaurantAddress"+index).text();
  var yelpURL = $("#yelpURL"+index).attr("href");

  if($(this).parent("#collapseOne")){
    console.log("This is an event")
    
  }else{
    console.log("It is not an event")
  }
  
  if($("#restaurantName"+index).parent("#collapseTwo")){
    console.log("This is a restaurant")
  }
  console.log(eventName)
  console.log(restaurantName)
  
  

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
