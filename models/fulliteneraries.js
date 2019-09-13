module.exports = function(sequelize, DataTypes) {
  var FullItineraries = sequelize.define("FullItineraries", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    userId: DataTypes.INTEGER,
    fullItineraryId: DataTypes.INTEGER
  });
  return FullItineraries;
};
