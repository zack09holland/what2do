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
  var favID = $("#trashBtn"+index).attr("value")
  console.log(index)
  console.log(favID)

  $.ajax({
    url: '/api/favorites/'+favID,
    method: 'DELETE',
  }).done(function () {
    console.log('deleted');
    window.location.reload(true);
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
