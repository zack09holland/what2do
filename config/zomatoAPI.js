var axios = require("axios");

module.exports = {
  searchParams: {
    //API uses
    // q query by city name; lat query by latitude; lon query by longitude; count # of results to return; city_ids comma seperated city_id values
    citiesAPIurl: "https://developers.zomato.com/api/v2.1/cities?",
    //city_id using the city id from cities; lat query by latitude; lon query by longitude
    collectionsAPIurl: "https://developers.zomato.com/api/v2.1/collections?",
    //city_id using the city id from cities; lat query by latitude; lon query by longitude
    cuisinesAPIurl: "https://developers.zomato.com/api/v2.1/cuisines?",
    //city_id using the city id from cities; lat query by latitude; lon query by longitude
    establishmentsAPIurl:
      "https://developers.zomato.com/api/v2.1/establishments?",
    //Get Foodie and Nightlife Index, list of popular cuisines and nearby restaurants
    //lat query by latitude; lon query by longitude
    geocodeAPIurl: "https://developers.zomato.com/api/v2.1/geocode?",
    // query query by city name; lat query by latitude; lon query by longitude; count # of results to return; city_ids comma seperated city_id values
    locationAPIurl: "https://developers.zomato.com/api/v2.1/locations?",
    // using the location ID from above get information
    //
    locationDetailsAPIurl:
      "https://developers.zomato.com/api/v2.1/location_details?",
    count: 100,
    countryId: "",
    cityId: "",
    entityId: "",
    entityType: ""
  },
  queryZomatoCities: function(destination, lat, lng, success, failure) {
    queryUrl =
      this.searchParams.locationAPIurl +
      "query=" +
      destination +
      "&lat=" +
      lat +
      "&lon=" +
      lng +
      "&count=" +
      this.searchParams.count;
    queryUrl = encodeURI(queryUrl);
    console.log(queryUrl);
    axios({
      method: "get",
      url: queryUrl,
      headers: {
        "user-key": "03136f6b258dbdebd5478a174180a71f",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        success(response);
      })
      .catch(function(error) {
        failure(error);
      });
  },
  queryZomatoGeocode: function(lat, lng, success, failure) {
    queryUrl = this.searchParams.geocodeAPIurl + "lat=" + lat + "&lon=" + lng;
    queryUrl = encodeURI(queryUrl);
    axios({
      method: "get",
      url: queryUrl,
      headers: {
        "user-key": "03136f6b258dbdebd5478a174180a71f",
        "Content-Type": "application/json"
      }
    })
      .then(function(response) {
        success(response);
      })
      .catch(function(error) {
        failure(error);
      });
    //   if (response.data.nearby_restaurants.length > 0) {
    //     return response.data.nearby_restaurants;
    //   } else {
    //     return false;
    //   }
    // });
  }
};
// var that = this;
// var zomatoApis = {
//   function(destination, lat, lng) {
//     queryUrl =
//       this.searchParams.locationAPIurl +
//       "query=" +
//       destination +
//       "&lat=" +
//       lat +
//       "&lon=" +
//       lng +
//       "&count=" +
//       this.searchParams.count;
//     queryUrl = encodeURI(queryUrl);
//     app.get(queryUrl, function(res) {
//         console.log(res);
//     //   if (res.location_suggestions.hasTotal > 0) {
//     //     that.zomatoApis.searchParams.entityId =
//     //       data.location_suggestions[0].entity_id;
//     //     that.zomatoApis.searchParams.entityType =
//     //       data.location_suggestions[0].entity_type;
//     //     that.zomatoApis.searchParams.countryId =
//     //       data.location_suggestions[0].country_id;
//     //     that.zomatoApis.searchParams.cityId =
//     //       data.location_suggestions[0].city_id;
//     //     //that.zomatoApis.queryZomatoCollections();
//     //     that.zomatoApis.queryZomatoGeocode(lat, lng);
//     //     //that.zomatoApis.queryZomatoLocationsDetails();
//     //   } else {
//     //     that.searchResults.zomatoComplete = true;
//     //   }
//     });
//   },
//   queryZomatoCollections: function() {
//     queryUrl =
//       this.searchParams.collectionsAPIurl +
//       "city_id=" +
//       this.searchParams.city_id;
//     queryUrl = encodeURI(queryUrl);
//     $.ajax({
//       headers: {
//         "user-key": "03136f6b258dbdebd5478a174180a71f",
//         "Content-Type": "application/json"
//       },
//       url: queryUrl,
//       method: "get"
//     }).then(function(data) {
//       console.log("Travis Hates This Function");
//     });
//   },
//   queryZomatoGeocode: function(lat, lng) {
//     queryUrl = this.searchParams.geocodeAPIurl + "lat=" + lat + "&lon=" + lng;
//     queryUrl = encodeURI(queryUrl);
//     $.ajax({
//       headers: {
//         "user-key": "03136f6b258dbdebd5478a174180a71f",
//         "Content-Type": "application/json"
//       },
//       url: queryUrl,
//       method: "get"
//       // Success callback function
//     }).then(
//       function(data) {
//         that.where2Application.searchResults.zomatoResults = true;
//         that.where2Application.searchResults.zomatoComplete = true;
//         //removeErrorMsgIfResults();
//         return data;
//         // Error callback function
//       },
//       function() {
//         that.where2Application.searchResults.zomatoResults = false;
//         that.where2Application.searchResults.zomatoComplete = true;
//       }
//     );
//   },
//   queryZomatoLocationsDetails: function() {
//     queryUrl =
//       this.searchParams.locationDetailsAPIurl +
//       "entity_id=" +
//       this.searchParams.entity_id +
//       "&entity_type=" +
//       this.searchParams.entity_type;
//     queryUrl = encodeURI(queryUrl);
//     $.ajax({
//       headers: {
//         "user-key": "03136f6b258dbdebd5478a174180a71f",
//         "Content-Type": "application/json"
//       },
//       url: queryUrl,
//       method: "get"
//     }).then(function(data) {
//       console.log("Travis Hates This Function");
//     });
//   }
// };

// // Exporting our configured passport
// module.exports = zomatoApis;
