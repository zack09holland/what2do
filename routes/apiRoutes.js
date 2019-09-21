var db = require("../models");
var passport = require("../config/passport");
var zomatoAPI = require("../config/zomatoAPI");
var yelpAPI = require("../config/yelpAPI");
var eventBrite = require("../config/eventBrite");

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    db.User.create({
      email: req.body.email,
      password: req.body.password
    })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });

  app.get("/api/search", function(req, res) {
    var searchParams = req.query;
    zomatoAPI.queryZomatoCities(
      searchParams.destination,
      searchParams.lat,
      searchParams.lng,
      function(response) {
        zomatoAPI.queryZomatoGeocode(
          searchParams.lat,
          searchParams.lng,
          function(response) {
            var zomResults = {
              zomatoAPIData: response.data.nearby_restaurants
            };
            yelpAPI.queryYelp(
              searchParams.destination,
              //zomResults,
              function(response) {
                var results = {
                  yelpAPIData: response
                };
                eventBrite.queryEventbrite(
                  searchParams.destination,
                  searchParams.radius,
                  searchParams.start,
                  searchParams.end,
                  function(response) {
                    var results = {
                      eventBriteAPI: response
                    };
                    res.send(results);
                  },
                  function(error) {
                    console.log(error);
                    res.send(error);
                  }
                );
              },
              function(error) {
                console.log(error);
                res.send(error);
              }
            );
          },
          function(error) {
            console.log(error);
            res.send(error);
          }
        );
      },
      function(error) {
        console.log(error);
        res.send(error);
      }
    );
    var zomatoPromise = new Promise(function(resolve, reject) {
      console.log("zomatoPromise");
      zomatoAPI.queryZomatoCities(
        searchParams.destination,
        searchParams.lat,
        searchParams.lng,
        function(response) {
          zomatoAPI.queryZomatoGeocode(
            searchParams.lat,
            searchParams.lng,
            function(response) {
              console.log("zomatoPromiseResponse");
              var results = {
                zomatoAPIData: response.data.nearby_restaurants
              };
              resolve(results);
            },
            function(error) {
              console.log(error);
              res.send(error);
            }
          );
        },
        function(error) {
          console.log(error);
          res.send(error);
        }
      );
    });
    zomatoPromise.then(function(value) {
      console.log(value);
    });

    var yelpPromise = new Promise(function(resolve, reject) {
      console.log("yelpPromise");
      yelpAPI.queryYelp(
        searchParams.destination,
        function(response) {
          console.log("yelpPromiseResponse");
          var results = {
            yelpAPIData: response
          };
          resolve(results);
        },
        function(error) {
          console.log(error);
          res.send(error);
        }
      );
    });

    yelpPromise.then(function(value) {
      //console.log(value);
    });
    var eventBritePromise = new Promise(function(resolve, reject) {
      console.log("eventBritePromise");
      eventBrite.queryEventbrite(
        searchParams.destination,
        searchParams.radius,
        searchParams.start,
        searchParams.end,
        function(response, prevResults) {
          var results = {
            eventBriteAPI: response
          };
          resolve(results);
        },
        function(error) {
          console.log(error);
          res.send(error);
        }
      );
    });

    Promise.all([zomatoPromise, yelpPromise, eventBritePromise]).then(function(
      allTheValues
    ) {
      console.log(allTheValues);
    });
    eventBritePromise.then(function(value) {
      //console.log(value);
    });
  });

  app.post("/api/results", function(req, res) {
    res.json(req.user);
  });
  app.post("/api/favorites", function(req, res) {
    res.json(req.user);
  });
  // Get all examples
  // app.get("/api/examples", function(req, res) {
  //   db.Example.findAll({}).then(function(dbExamples) {
  //     res.json(dbExamples);
  //   });
  // });

  // // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Example.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Example.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
