'use strict';
module.exports = function(sequelize, DataTypes) {
  var Activity = sequelize.define('Activity', {
    name: DataTypes.STRING,
    measurment: DataTypes.STRING
  }, {});

Activity.associate = (function(models){
  Activity.hasMany(models.Stats, { as: 'Stats', foreignKey:'activityId'})
})

  return Activity;
};
