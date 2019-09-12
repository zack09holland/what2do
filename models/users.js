module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firebase_id: DataTypes.STRING
  });
  return Users;
};