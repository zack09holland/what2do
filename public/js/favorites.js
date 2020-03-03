document.getElementById("goBack").addEventListener("click", function(event) {
  event.preventDefault();
  window.history.back();
});

$(document).ready(function() {
  
  $.getJSON("/api/favorites").then(function(data) {
    var container = $('.favorites')
    var template = $('#tweets-template').html()

    var templateHandlebars = Handlebars.compile(template);
                    container.append(templateHandlebars(data));

    console.log(data);
    console.log(data[0].favoriteTitle);
  //   var dbFavs = $.map(data.results, function(tweet) {
  //     return {
  //         author: tweet.from_user,
  //         tweet: tweet.text,
  //         thumb: tweet.profile_image_url,
          
  //     };
  // });
    
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
