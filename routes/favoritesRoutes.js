var db = require("../models");

module.exports = function (app) {
    // app.get("/api/favorites", function(req, res) {
    //     db.Favorites.findAll({}).then(function(userFav){
    //         res.json(userFav);
    //     });
    // });

    app.get("/api/favorites/:id", function (req, res) {
        db.Favorites.findOne({
            where: {
                id: req.user.id
            }
        }).then(function (userFav) {
            res.json(userFav);
        });
    });

    app.post("/api/favorites", function (req, res) {
        db.Favorites.create(req.body).then(function (userFav) {
            res.json(userFav);
        });
    });

    app.delete("/api/favorites/:id", function (req, res) {
        db.Favorites.destroy({
            where: {
                favoritesId: req.user.id
            }
        }).then(function (userFav) {
            res.json(userFav);
        });
    });


};