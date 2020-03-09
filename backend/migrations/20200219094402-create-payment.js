"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("payments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      no_rek: {
        type: Sequelize.STRING
      },
      proof_of_transfer: {
        type: Sequelize.STRING
      },
      user: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM("free", "premium")
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
    return queryInterface.dropTable("payments");
  }
};
