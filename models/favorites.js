module.exports = function(sequelize, DataTypes) {
    var Favorites = sequelize.define("Favorites", {
      favorites_id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      title: DataTypes.STRING,
      api_location: DataTypes.STRING,
      api_uniqueid: DataTypes.STRING,
      countofUsers: DataTypes.INTEGER
    });
    return Favorites;
  };