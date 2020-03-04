document.getElementById("goBack").addEventListener("click", function(event) {
  event.preventDefault();
  window.history.back();
});

$(document).ready(function() {
  
  $.getJSON("/api/favorites").then(function(data) {
    console.log(data);
  });
});

$(".deleteFav").click(function () {
  var index = $(".deleteFav").index(this);
  console.log(index)
  // $.delete("/api/favorites/:id", object).then(function (data) {
  //   if (data) {
  //     console.log("OMG the Server Returned Something:");
  //     console.log(data);
  //   }
  // });
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
