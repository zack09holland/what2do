$(document).ready(function() {
  $("#favorites-container, #itineraries-container").hide();
  // $("results-card").hide();
  setTimeout(function() {
    $("body").addClass("loaded");
    $("h1").css("color", "#222222");
  }, 3000);
});
$("#favoritesBtn").click(function() {
  $("#itineraries-container").hide()
  $("#results-container").hide();
  $("#favorites-container").slideToggle();
});
$("#resultsBtn").click(function() {
  $("#itineraries-container").hide()
  $("#favorites-container").hide();
  $("#results-container").slideToggle();
});
$("#itinerariesBtn").click(function() {
  $("#results-container").hide();
  $("#favorites-container").hide();
  $("#itineraries-container").slideToggle();
});
