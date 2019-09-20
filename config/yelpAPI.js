var axios = require("axios");

module.exports = {
  searchParams: {
    url:
      "https://api.yelp.com/v3/businesses/search?",
    count: 10
  },
  queryYelp: function(destination, prevResults, success, failure) {
    console.log("yelp");
    queryUrl = this.searchParams.url + "location=" + destination;
    axios({
      method: "get",
      url: queryUrl,
      headers: {
        Authorization:
          "Bearer nKNSGBXfE2merLDsLJybUbAq_v2hXvOPf2IIt23CaozaMvdZOUD06OHtvA5NAO2rgX7ryLGcd-m3jOPs7Xy_Y_wxcmJyPOws-kp4tOspc9yTvj_xt4yBtLjHxakmXXYx"
      }
    })
      .then(function(response) {
        var yelpBusinesses = response.data.businesses;
        //console.log(yelpBusinesses);
        success(yelpBusinesses, prevResults);
      })
      .catch(function(error) {
        failure(error);
      });
  }
};
