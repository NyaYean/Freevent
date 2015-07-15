'use strict';
module.exports = function(sequelize, DataTypes) {
  var events = sequelize.define('events', {
    event_name: DataTypes.STRING,
    venue_name: DataTypes.STRING,
    borough: DataTypes.STRING,
    venue_website: DataTypes.STRING,
    telephone: DataTypes.INTEGER,
    date_time_description: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        events.belongsToMany(models.users, {
          through: 'users_events',
          foreignKey: 'event_id'
        })
      }
    }
  });
  return events;
};