var axios = require("axios");
var moment = require("moment");

module.exports = {
  searchParams: {
    url: "https://www.eventbriteapi.com/v3/events/search"
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
      "/?q=" +
      "&location.address=" +
      destination +
      "&location.within=" +
      radius +
      "mi" +
      "&expand=venue" +
      "&start_date.range_start=" +
      moment(startDate).format("YYYY-MM-DD") +
      "T00:00:01Z" +
      "&start_date.range_end=" +
      moment(endDate).format("YYYY-MM-DD") +
      "T00:00:01Z" +
      "&page=" +
      (this.searchResults.pageNumber + 1);
    axios({
      method: "get",
      url: queryUrl,
      headers: {
        Authorization: "Bearer 66AKEOSDCRZBQ2RSCGXN"
      }
    })
      .then(function(response) {
        var eventBriteAPIData = response.data.events;
        //console.log(eventBriteAPIData);
        success(eventBriteAPIData);
      })
      .catch(function(error) {
        failure(error);
      });
  }
};
