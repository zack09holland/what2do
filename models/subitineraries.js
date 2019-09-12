module.exports = function(sequelize, DataTypes) {
  var SubItineraries = sequelize.define("SubItineraries", {
    subitinerary_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    StartDate: DataTypes.DATEONLY,
    EndDate: DataTypes.DATEONLY,
    Destination: DataTypes.STRING
  });
  return SubItineraries;
};