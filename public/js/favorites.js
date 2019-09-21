document.getElementById("goBack").addEventListener("click", function(event) {
  event.preventDefault();
  window.history.back();
});

$(document).ready(function() {
  $.get("/api/favorites").then(function(data) {
    console.log(data);
  });
});
