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
    var zomatoPromise = new Promise(function(resolve, reject) {
      zomatoAPI.queryZomatoCities(
        searchParams.destination,
        searchParams.lat,
        searchParams.lng,
        function(response) {
          zomatoAPI.queryZomatoGeocode(
            searchParams.lat,
            searchParams.lng,
            function(response) {
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

    var yelpPromise = new Promise(function(resolve, reject) {
      yelpAPI.queryYelp(
        searchParams.destination,
        function(response) {
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

    var eventBritePromise = new Promise(function(resolve, reject) {
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
      res.send(allTheValues);
    });
  });

  app.get("/api/favorites", function(req, res) {
    var query = {};
    if (req.user.id) {
      query.UserId = req.user.id;
    }
    console.log(query);
    db.Favorites.findAll({
      where: query
    }).then(function(dbFavs) {
      res.json(dbFavs);
    });
  });

  app.post("/api/favorites", function (req, res) {
    console.log(req.body);
    console.log(req.user);
    var object = {
      favoriteTitle: req.body.favoriteTitle,
      favoriteUrl: req.body.favoriteUrl,
      favoriteImg: req.body.favoriteImg,
      favoriteStartDate: req.body.favoriteStartDate,
      favoriteEndDate: req.body.favoriteEndDate,
      favoriteDestination: req.body.favoriteDestination,
      UserId: req.user.id
    };

    // db.Favorites.create(object).then(function(data) {
    //   res.json(data);
    // });

    db.Favorites.findOrCreate({
      where: {
        favoriteTitle: object.favoriteTitle,
        UserId: req.user.id
      },
      defaults: {
        favoriteUrl: object.favoriteUrl,
        favoriteImg: object.favoriteImg,
        favoriteUrl: object.favoriteUrl,
        favoriteUrl: object.favoriteUrl,
        favoriteUrl: object.favoriteUrl,
        favoriteUrl: object.favoriteUrl,
      }
    }).spread(function (data) {
      res.json(data)
      console.log(data)
    });
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
