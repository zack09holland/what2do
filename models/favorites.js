module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    favoritesId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    favoriteType: DataTypes.STRING,
    favoriteTitle: DataTypes.STRING,
    favoriteUrl: DataTypes.STRING,
    favoriteImg: DataTypes.STRING,
    favoriteNote: {
      type: DataTypes.STRING,
      allowNull: true
    },
    favoriteEventDate: DataTypes.DATEONLY,
    favoriteStartDate: DataTypes.DATEONLY,
    favoriteEndDate: DataTypes.DATEONLY,
    favoriteDestination: DataTypes.STRING,
    favoriteRadius: DataTypes.INTEGER
  });

  Favorites.associate = function(models) {
    Favorites.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Favorites;
};
