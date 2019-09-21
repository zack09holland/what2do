module.exports = function(sequelize, DataTypes) {
  var Favorites = sequelize.define("Favorites", {
    favoritesId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    favoriteTitle: DataTypes.STRING,
    favortieUrl: DataTypes.STRING,
    favoriteImg: DataTypes.STRING,
    favoriteNote: {
      type: DataTypes.STRING,
      allowNull: true
    },
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
