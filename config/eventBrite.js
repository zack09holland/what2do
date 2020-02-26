var axios = require("axios");
var moment = require("moment");

module.exports = {
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
  queryEventbrite: function(
    destination,
    radius,
    startDate,
    endDate,
    success,
    failure
  ) {
    if (this.searchResults.previousResult) {
      //console.log("EventContentExist")
    }
    var queryUrl =
      this.searchParams.url +
      "apikey=XewKqGsweKUVu1zlnx5SxwWMAtmoWvfS"+
                "&radius="+ radius+
                "&locale=*"+
                "&startDateTime="+moment(startDate).format('YYYY-MM-DD')+"T00:00:01Z"+
                "&endDateTime="+moment(endDate).format('YYYY-MM-DD')+"T00:00:01Z"+
                "&page="+(this.searchResults.pageNumber + 1) +
                "&city="+destination;
      // "/?q=" +
      // "&location.address=" +
      // destination +
      // "&location.within=" +
      // radius +
      // "mi" +
      // "&expand=venue" +
      // "&start_date.range_start=" +
      // moment(startDate).format("YYYY-MM-DD") +
      // "T00:00:01Z" +
      // "&start_date.range_end=" +
      // moment(endDate).format("YYYY-MM-DD") +
      // "T00:00:01Z" +
      // "&page=" +
      // (this.searchResults.pageNumber + 1);

      
    axios({
      url: queryUrl,
      type: "get",
      async:true,
      dataType: "json",
    })
      .then(function(response) {
        var eventBriteAPIData = response.data._embedded.events;
        console.log(response);
        console.log(eventBriteAPIData);
        success(eventBriteAPIData);
      })
      .catch(function(error) {
        failure(error);
      });
  }
};
