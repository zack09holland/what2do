//var database = firebase.database();
/// Javascript Code Below

var clockRunning = false;
function start() {
  if (!clockRunning) {
    intervalId = setInterval(count, 1000);
    clockRunning = true;
  }
}

function stop() {
  clearInterval(intervalId);
  clockRunning = false;
}

function count() {
  displayFixes();
}

var that = this;
var where2Application = {
  searchParams: {
    start: "",
    end: "",
    destination: "",
    destinationArray: [],
    city: "",
    state: "",
    country: "",
    countryLongName: "",
    radius: 0,
    lat: 0,
    lng: 0,
    verified: false
  },
  userDetails: {
    displayName: "",
    email: "",
    emailverified: "",
    photoURL: "",
    isAnonymous: "",
    uid: "",
    providerData: "",
    isAuthenticated: false
  },
  setDateValues: function() {
    var startDate = new Date();
    var dd = startDate.getDate();
    var mm = startDate.getMonth() + 1;
    var yyyy = startDate.getFullYear();
    var numberOfDaysToAdd = 7;
    var numberOfYearsToAdd = 1;
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    $("#start").attr("value", yyyy + "-" + mm + "-" + dd);
    $("#start").attr("min", yyyy + "-" + mm + "-" + dd);
    $("#start").attr("max", yyyy + 1 + "-" + mm + "-" + dd);
    $("#end").attr("min", yyyy + "-" + mm + "-" + dd);
    var endDate = new Date();
    endDate.setDate(endDate.getDate() + numberOfDaysToAdd);
    var dd = endDate.getDate();
    var mm = endDate.getMonth() + 1;
    var yyyy = endDate.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    $("#end").attr("value", yyyy + "-" + mm + "-" + dd);
    $("#end").attr("max", yyyy + 1 + "-" + mm + "-" + dd);
  },
  searchResults: {
    eventbriteResults: false,
    eventbriteComplete: false,
    yelpResults: false,
    yelpComplete: false,
    allResults: false
  },
  // Eventbrite API
  eventbriteAPI: {
    eventObject: {
      eventImg: "",
      eventName: "",
      eventDate: "",
      eventTicketLink: ""
    },
    searchParams : {
      url: "https://app.ticketmaster.com/discovery/v2/events?"
    },
    searchResults: {
      count: 10,
      perPage: 0,
      pageNumber: 0,
      pageCount: 0,
      previousResult: ""
    },
    queryEventbrite: function() {
      if (this.searchResults.previousResult) {
        //console.log("EventContentExist")
      }
      var queryURL = this.searchParams.url +
      "apikey=XewKqGsweKUVu1zlnx5SxwWMAtmoWvfS"+
      "&radius="+that.where2Application.searchParams.radius+
      "&locale=*"+
      "&startDateTime="+moment(that.where2Application.searchParams.start).format('YYYY-MM-DD')+"T00:00:01Z"+
      "&endDateTime="+moment(that.where2Application.searchParams.end).format('YYYY-MM-DD')+"T00:00:01Z"+
      "&page="+(this.searchResults.pageNumber + 1) +
      "&city="+that.where2Application.searchParams.destination;
              // "/?q=" + "&location.address="+that.where2Application.searchParams.destination +
              // "&location.within="+that.where2Application.searchParams.radius+"mi"+"&expand=venue"+
              // "&start_date.range_start="+ moment(that.where2Application.searchParams.start).format('YYYY-MM-DD')+"T00:00:01Z"+
              // "&start_date.range_end="+moment(that.where2Application.searchParams.end).format('YYYY-MM-DD')+"T00:00:01Z"+
              // "&page="+(this.searchResults.pageNumber + 1)
              console.log(queryURL)
      $.ajax({
        url: queryURL,
                type: "get",
                async:true,
                dataType: "json",
        // Evenbrite query success
      }).then(
        function(data) {
          that.where2Application.searchResults.eventbriteResults = true;
          that.where2Application.searchResults.eventbriteComplete = true;
          console.log(data._embedded.events)
          // that.where2Application.eventbriteAPI.searchResults.previousResult = data;
          // that.where2Application.eventbriteAPI.searchResults.perPage =
          //   data.pagination.page_size;
          // that.where2Application.eventbriteAPI.searchResults.pageNumber =
          //   data.pagination.page_number;
          // that.where2Application.eventbriteAPI.searchResults.pageCount =
          //   data.pagination.page_count;
          renderEvent(data._embedded.events);
        },
        function() {
          that.where2Application.searchResults.eventbriteResults = false;
          that.where2Application.searchResults.eventbriteComplete = true;
        }
      );
    }
  },
  yelpAPI: {
    searchParams: {
      url:
        "https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?",
      count: 10
    },
    queryYelp: function() {
      queryUrl =
        this.searchParams.url +
        "location=" +
        that.where2Application.searchParams.destination;
      $.ajax({
        headers: {
          Authorization:
            "Bearer nKNSGBXfE2merLDsLJybUbAq_v2hXvOPf2IIt23CaozaMvdZOUD06OHtvA5NAO2rgX7ryLGcd-m3jOPs7Xy_Y_wxcmJyPOws-kp4tOspc9yTvj_xt4yBtLjHxakmXXYx"
        },
        url: queryUrl,
        method: "get"
        // Yelp API success
      }).then(
        function(data) {
          that.where2Application.searchResults.yelpResults = true;
          var yelpBusinesses = data.businesses;
          //removeErrorMsgIfResults();
          $("#restaurants-results-card").removeClass("d-none");
          renderYelpData(yelpBusinesses);
          that.where2Application.searchResults.yelpComplete = true;
          // Yelp API fail
        },
        function() {
          that.where2Application.searchResults.yelpResults = false;
          that.where2Application.searchResults.yelpComplete = true;
        }
      );
    }
  },
  printResultCard: function(
    location,
    cardImage,
    cardLineOne,
    cardLineTwo,
    cardLineThree,
    cardLineFour,
    cardLineFive,
    cardLineSix,
    externalLink,
    externalLinkName
  ) {
    var divContainerFluid = $("<div>");
    divContainerFluid.attr("class", "container-fluid");
    var divContainerRow = $("<div>");
    divContainerRow.attr("class", "row");
    var divContainerCol = $("<div>");
    divContainerCol.attr("class", "col-12 mt-3");
    var divContainerCard = $("<div>");
    divContainerCard.attr("class", "card shadow-lg");
    var divContainerCardRow = $("<div>");
    divContainerCardRow.attr("class", "row m-0");
    var divContainerCardRowImgCol = $("<div>");
    divContainerCardRowImgCol.attr("class", "col-6 col-md-4 m-auto");
    var divContainerCardRowActualImg = $("<img>");
    divContainerCardRowActualImg.attr("class", "img-responsive m-auto");
    divContainerCardRowActualImg.attr("src", cardImage);
    var divContainerCardRowBodyCol = $("<div>");
    divContainerCardRowBodyCol.attr("class", "col-6 col-md-8");
    var divContainerCardRowActualBody = $("<div>");
    divContainerCardRowActualBody.attr("class", "card-body");
    var divContainerCardFooter = $("<div>");
    divContainerCardFooter.attr("class", "card-footer");
    var divContainerCardFooterSpanOne = $("<span>");
    var divContainerCardFooterSpanTwo = $("<span>");
    divContainerCardFooterSpanTwo.attr("class", "float-right");
    var divContainerCardFooterHeart = $("<i>");
    divContainerCardFooterHeart.attr("class", "fas fa-heart");
    if (cardLineOne) {
      var cardBodyLineOne = $("<p>");
      cardBodyLineOne.attr("class", "card-text card-line");
      var cardBodyLineOneStrong = $("<strong>");
      cardBodyLineOneStrong.text(cardLineOne);
      cardBodyLineOne.append(cardBodyLineOneStrong);
      divContainerCardRowActualBody.append(cardBodyLineOne);
    }
    if (cardLineTwo) {
      var cardBodyLineTwo = $("<p>");
      cardBodyLineTwo.attr("class", "card-text card-line");
      var cardBodyLineTwoSmall = $("<small>");
      cardBodyLineTwoSmall.text(cardLineTwo);
      cardBodyLineTwo.append(cardBodyLineTwoSmall);
      divContainerCardRowActualBody.append(cardBodyLineTwo);
    }
    if (cardLineThree) {
      var cardBodyLineThree = $("<p>");
      cardBodyLineThree.attr("class", "card-text card-line");
      cardBodyLineThree.text(cardLineThree);
      divContainerCardRowActualBody.append(cardBodyLineThree);
    }
    if (cardLineFour) {
      var cardBodyLineFour = $("<p>");
      cardBodyLineFour.attr("class", "card-text card-line");
      cardBodyLineFour.text(cardLineFour);
      divContainerCardRowActualBody.append(cardBodyLineFour);
    }
    if (cardLineFive) {
      var cardBodyLineFive = $("<p>");
      cardBodyLineFive.attr("class", "card-text card-line");
      cardBodyLineFive.text(cardLineFive);
      divContainerCardRowActualBody.append(cardBodyLineFive);
    }
    if (cardLineSix) {
      var cardBodyLineSix = $("<p>");
      cardBodyLineSix.attr("class", "card-text card-line");
      cardBodyLineSix.text(cardLineSix);
      divContainerCardRowActualBody.append(cardBodyLineSix);
    }
    if (externalLink) {
      var cardBodyExtURL = $("<a>");
      cardBodyExtURL.attr("class", "card-text card-line");
      cardBodyExtURL.attr("href", externalLink);
      cardBodyExtURL.attr("target", "_blank");
      cardBodyExtURL.text(externalLinkName);
      divContainerCardFooterSpanOne.append(cardBodyExtURL);
    }
    divContainerCardFooterSpanTwo.append(divContainerCardFooterHeart);
    divContainerCardRowBodyCol.append(divContainerCardRowActualBody);
    divContainerCardRowImgCol.append(divContainerCardRowActualImg);
    divContainerCardRow.append(divContainerCardRowImgCol);
    divContainerCardRow.append(divContainerCardRowBodyCol);
    divContainerCard.append(divContainerCardRow);
    divContainerCardFooter.append(divContainerCardFooterSpanOne);
    divContainerCardFooter.append(divContainerCardFooterSpanTwo);
    divContainerCard.append(divContainerCardFooter);
    divContainerCol.append(divContainerCard);
    divContainerRow.append(divContainerCol);
    divContainerFluid.append(divContainerRow);
    $("#" + location).append(divContainerFluid);
  }
};
// $("#Search").on("click", function() {
//   if (that.where2Application.searchParams.valid) {
//     $("#contentDetails").hide();
//     that.where2Application.searchParams.start = $("#start")
//       .val()
//       .trim();
//     that.where2Application.searchParams.end = $("#end")
//       .val()
//       .trim();
//     that.where2Application.searchParams.radius = $("#radius")
//       .val()
//       .trim();
//     that.where2Application.zomatoApis.queryZomatoCities();
//     that.where2Application.eventbriteAPI.queryEventbrite();
//     that.where2Application.yelpAPI.queryYelp();
//     displayFixes();
//     document.getElementById("filler").style.height = "200px";
//   }
// });
function renderEvent(queryData) {
  console.log(queryData)
  $("#collapseOne").empty();
  //$("#gifContainer").empty();

  // Check if queryData length is 0, or array is empty
  // then show error messages
  if (queryData.length === 0) {
    that.where2Application.searchResults.eventbriteResults = false;
    //$('#event-results-card').hide();
    if (
      !that.where2Application.searchResults.eventbriteResults &&
      !that.where2Application.searchResults.yelpResults
    ) {
      //noResultsErrorMsg();
    }
  } else {
    //$('#event-results-card').show();
    //removeErrorMsgIfResults();
    for (var i = 0; i < queryData.length; i++) {
      if (queryData[i].venue.address.address_1 === null) {
        var eventAddress = queryData[i].venue.address.localized_area_display;
      } else {
        var eventAddress =
          queryData[i].venue.address.address_1 +
          ", " +
          queryData[i].venue.address.localized_area_display;
      }
      var eventDate = queryData[i].start.local;
      var eventName = queryData[i].name.text;
      var eventImg = queryData[i].logo.url;
      if (!eventImg) {
        eventImg = "assets/images/defaultEvent.jpg";
      }
      var eventURL = queryData[i].url;
      that.where2Application.printResultCard(
        "collapseOne",
        eventImg,
        eventName,
        eventAddress,
        eventDate,
        null,
        null,
        null,
        eventURL,
        "Results from EventBrite"
      );
    }
    $("#errorNoScroll").attr("href", "");
  }
}

function renderYelpData(queryData) {
  $("#yelp-data-wrapper").empty();
  for (var i = 0; i < queryData.length; i++) {
    var yelpImg = queryData[i].image_url;
    if (!yelpImg) {
      yelpImg = "assets/images/defaultFood.jpg";
    }
    var yelpBusinessName = queryData[i].name;
    var yelpAddress =
      queryData[i].location.address1 +
      " " +
      queryData[i].location.address2 +
      " " +
      queryData[i].location.address3;
    var yelpCityStateCountryZip =
      queryData[i].location.city +
      ", " +
      queryData[i].location.state +
      ", " +
      queryData[i].location.country +
      ", " +
      queryData[i].location.zip_code;
    var yelpCleanAddress = yelpAddress + "; " + yelpCityStateCountryZip;
    var displayPhone = queryData[i].display_phone;
    var price = "Price: " + queryData[i].price;
    var rating = "Rating: " + queryData[i].rating;
    var reviewCount = "Review Count: " + queryData[i].review_count;
    var yelpPage = queryData[i].url;
    that.where2Application.printResultCard(
      "yelp-data-wrapper",
      yelpImg,
      yelpBusinessName,
      yelpCleanAddress,
      displayPhone,
      price,
      rating,
      reviewCount,
      yelpPage,
      "Results from Yelp"
    );
  }
}
// function displayFixes() {
//   if (
//     that.where2Application.searchResults.yelpComplete &&
//     that.where2Application.searchResults.eventbriteComplete
//   ) {
//     stop();
//     if (
//       (that.where2Application.searchResults.zomatoResults &&
//         that.where2Application.searchResults.yelpResults) ||
//       (that.where2Application.searchResults.zomatoResults ||
//         that.where2Application.searchResults.yelpResults)
//     ) {
//       $("#restaurants-results-card").show();
//       that.where2Application.searchResults.allResults = true;
//     } else {
//       $("#restaurants-results-card").hide();
//     }
//     if (that.where2Application.searchResults.eventbriteResults) {
//       $("#event-results-card").show();
//       that.where2Application.searchResults.allResults = true;
//     } else {
//       $("#event-results-card").hide();
//     }
//     if (that.where2Application.searchResults.allResults) {
//       $("#contentDetails").show();
//     }
//   } else {
//     setTimeout(start(), 1000);
//   }
// }

// function ComeONMan() {
//   if (
//     !that.where2Application.searchResults.yelpComplete &&
//     !that.where2Application.searchResults.eventbriteComplete
//   ) {
//     setTimeout(displayFixes(), 1000);
//   }
// }


