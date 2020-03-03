document.getElementById("goBack").addEventListener("click", function(event) {
  event.preventDefault();
  window.history.back();
});

$(document).ready(function() {
  $.getJSON("/api/favorites").then(function(data) {
    console.log(data);
    JSON.parse(data)
    console.log(this);
    
  });
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
