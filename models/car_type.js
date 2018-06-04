'use strict';
// var model = require('../models/index');
module.exports = (sequelize, DataTypes) => {
    const cars = sequelize.import("cars.js");
    var car_type = sequelize.define('car_type', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
      carId: {
          type: DataTypes.INTEGER,
          references: {
              model: cars,
              key: 'id'
          }
      },
    name: DataTypes.STRING
  }, {});
  car_type.associate = function(models) {
    // associations can be defined here
  };

  return car_type;
};