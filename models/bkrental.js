'use strict';
module.exports = (sequelize, DataTypes) => {
  var BKRental = sequelize.define('BKRental', {
    title: DataTypes.STRING,
    description: DataTypes.STRING
  }, {});
  BKRental.associate = function(models) {
    // associations can be defined here
  };
  return BKRental;
};