module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    favoritesId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    title: DataTypes.STRING,
    apiLocation: DataTypes.STRING,
    apiUniqueid: DataTypes.STRING,
    countofUsers: DataTypes.INTEGER
  });
  return Favorites;
};
