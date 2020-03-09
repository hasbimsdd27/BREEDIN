"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "ages",
      [
        {
          name: "adult",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "child",
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: "old",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ages", null, {});
  }
};
