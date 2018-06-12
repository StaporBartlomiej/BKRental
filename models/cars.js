'use strict';
module.exports = (sequelize, DataTypes) => {
    // const car_type = sequelize.import('../models/car_type.js');
    var car_type = require('../models/car_type.js');
    var cars = sequelize.define('cars', {
      id :{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
      cost_class: DataTypes.STRING,
      car_name: DataTypes.STRING,
      price_per_day: DataTypes.INTEGER,
      air_conditioning: DataTypes.BOOLEAN,
      number_of_seats: DataTypes.INTEGER,
      engine_type: DataTypes.STRING,
      transmission: DataTypes.STRING,
      bluetooth: DataTypes.BOOLEAN,
      img_link: DataTypes.STRING
  }, {});
  cars.associate = function(models) {
    // associations can be defined here
  };
  return cars;
};