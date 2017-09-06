'use strict';
module.exports = function(sequelize, DataTypes) {
  var Stats = sequelize.define('Stats', {
    date: DataTypes.STRING,
    measurement: DataTypes.STRING,
    activityId: DataTypes.INTEGER
  }, {});

Stats.associate = (function(models){
  Stats.belongsTo(models.Activity, {as: 'activity', foreignKey: 'activityId'})
})

  return Stats;
};
