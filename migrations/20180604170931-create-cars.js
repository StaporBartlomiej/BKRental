'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      car_type: {
        type: Sequelize.STRING
      },
      cost_class: {
        type: Sequelize.STRING
      },
      car_name: {
        type: Sequelize.STRING
      },
      price_per_day: {
        type: Sequelize.INTEGER
      },
      air_conditioning: {
        type: Sequelize.BOOLEAN
      },
      number_of_seats: {
        type: Sequelize.INTEGER
      },
      engine_type: {
        type: Sequelize.STRING
      },
      transmission: {
        type: Sequelize.STRING
      },
      bluetooth: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cars');
  }
};