'use strict';
module.exports = (sequelize, DataTypes) => {
  var cars = sequelize.define('cars', {
    id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
    car_type: DataTypes.INTEGER,
    cost_class: DataTypes.STRING,
    car_name: DataTypes.STRING,
    price_per_day: DataTypes.INTEGER,
    air_conditioning: DataTypes.BOOLEAN,
    number_of_seats: DataTypes.INTEGER,
    engine_type: DataTypes.STRING,
    transmission: DataTypes.STRING,
    bluetooth: DataTypes.BOOLEAN
  }, {});
  cars.associate = function(models) {
    // associations can be defined here
  };
  return cars;
};