$(document).ready(function() {
  $("#favorites-container, #itineraries-container").hide();
  // $("results-card").hide();
  setTimeout(function() {
    $("body").addClass("loaded");
    $("h1").css("color", "#222222");
  }, 3000);
});
$("#favoritesBtn").click(function() {
  $("#favorites-container").toggle();
});
$("#resultsBtn").click(function() {
  $("#results-container").toggle();
  // if($("#accordion").is(':visible')){
  //   $("#accordion").hide("slow")
  // }
  // if($("#accordion").is(':hidden')){
  //   $("#accordion").show("slow")
  // }
  // $(".results-card").is(':visible')
  // $(selector).css("propertyName", "value");
});
