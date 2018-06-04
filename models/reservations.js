'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.import("../models/user.js");
  const cars = sequelize.import('../models/cars.js');
  var reservations = sequelize.define('reservations', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncremnent: true
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: user,
            key: 'id'
        }
    },
    carId: {
        type: DataTypes.INTEGER,
        references: {
            model: cars,
            key: 'id'
        }
    },
    bookInDate: DataTypes.DATE,
    bookOutDate: DataTypes.DATE,
    totalPrice: DataTypes.INTEGER,
    isApprovedByAdmin: DataTypes.BOOLEAN,
    bookInPlace: DataTypes.STRING,
    bookOutPlace: DataTypes.STRING
  }, {});
  reservations.associate = function(models) {
    // associations can be defined here
  };
  return reservations;
};