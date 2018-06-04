'use strict';
module.exports = (sequelize, DataTypes) => {
  var reservations = sequelize.define('reservations', {
    userId: DataTypes.INTEGER,
    userFirstName: DataTypes.STRING,
    userLastName: DataTypes.STRING,
    age: DataTypes.INTEGER,
    idCardNumber: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.INTEGER,
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