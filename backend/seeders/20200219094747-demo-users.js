"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      "users",
      [
        {
          breeder: "ironman",
          email: "ironmen@ironmen.com",
          password:
            "$2b$10$YngyX5nhyg8HlBPLQD8vFuNuKlFmKgE0H3kb2uXNb079idTbC1zMW",
          phone: "08112233445566",
          address: "Jl. in Dulu aja",
          status: "admin",
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("users", null, {});
  }
};
