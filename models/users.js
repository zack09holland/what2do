module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    firebaseId: DataTypes.STRING
  });
  return Users;
};
