module.exports = function(sequelize, DataTypes) {
    var FullItineraries = sequelize.define("FullItineraries", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      user_id: DataTypes.INTEGER,
      fullItinerary_id: DataTypes.INTEGER
    });
    return FullItineraries;
  };