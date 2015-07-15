'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    username: { 
     type: DataTypes.STRING,
     allowNull: false,
     unique: { msg: "The username already exists, please choose another"}
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    borough: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: function(models) {
        users.belongsToMany(models.events, {
          through: "users_events",
          foreignKey: "user_id"
        });
      }
    }
  });
  return users;
};