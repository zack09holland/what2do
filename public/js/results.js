$(document).ready(function() {
  $("#favorites-container, #itineraries-container").hide();
  // $("results-card").hide();
  // setTimeout(function() {
  //   $("body").addClass("loaded");
  //   $("h1").css("color", "#222222");
  // }, 2000);
});
$("#favoritesBtn").click(function() {
  $("#itineraries-container").hide();
  $("#results-container").hide();
  $("#favorites-container").slideToggle();
});
$("#resultsBtn").click(function() {
  $("#itineraries-container").hide();
  $("#favorites-container").hide();
  $("#results-container").slideToggle();
});
$("#itinerariesBtn").click(function() {
  $("#results-container").hide();
  $("#favorites-container").hide();
  $("#itineraries-container").slideToggle();
});

$("#favoriteBtn").click(function() {
  // Create a new entry in the db with the contents of the obj
  //...hard time figuring out how to pass the object values into this
  
})
