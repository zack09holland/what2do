var db = require("../models");
// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");
var passport = require("../config/passport");

// app.get('/auth/google/return', passport.authenticate('google'), function(req, res) {
//   res.redirect(req.session.returnTo || '/');
//   delete req.session.returnTo;
// });
module.exports = function(app) {
  app.get("/", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.render("index", { user: true });
    } else {
      res.render("index", { user: false });
    }
  });

  app.get("/login", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
      //res.redirect(req.session.returnTo || '/');
    }
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

  app.get("/signup", function(req, res) {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/signup.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/members.html"));
  });
  // // Load index page
  // app.get("/", function(req, res) {
  //   res.render("index");
  //   // db.Example.findAll({}).then(function(dbExamples) {
  //   //   res.render("index", {
  //   //     msg: "Welcome!",
  //   //     examples: dbExamples
  //   //   });
  //   // });
  // });
  app.get("/results", function(req, res) {
    if (req.user) {
      res.render("results", { user: true });
    } else {
      res.render("results", { user: false });
    }
    // res.render("results", {
    //   eventImg : "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F57073564%2F189433837126%2F1%2Foriginal.jpg?h=200&amp;w=450&amp;auto=compress&amp;rect=0%2C208%2C2400%2C1200&amp;s=6fe732e2018657615ca37e702b14378c",
    //   eventName : "Hello World"
    // });
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Example.findOne({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.render("example", {
  //       example: dbExample
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
