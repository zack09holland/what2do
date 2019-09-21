var db = require("../models");

module.exports = function(app) {
  // GET route for getting all of the favs
  app.get("/api/favorites", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Favorites.findAll({
      where: {
        favoritesId: req.user.id
      }
    }).then(function(userFavs) {
      // We have access to the userFavs as an argument inside of the callback function
      res.json(userFavs);
    });
  });

  // POST route for saving a new fav
  app.post("/api/favorites/:id", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table.
    db.Favorites.create({
      favoritesId: req.params.id,
      title: req.body.complete
    }).then(function(userFavs) {
      // We have access to the new userFavs as an argument inside of the callback function
      res.json(userFavs);
    });
  });
  // DELETE route for deleting favs. We can get the id of the fav to be deleted from
  // req.params.id
  app.delete("/api/favorites/:id", function(req, res) {
    // We just have to specify which fav we want to destroy with "where"
    db.Favorites.destroy({
      where: {
        favoritesId: req.params.id
      }
    }).then(function(userFavs) {
      res.json(userFavs);
    });
  });
};
