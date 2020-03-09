"use strict";
module.exports = (sequelize, DataTypes) => {
  const pet = sequelize.define(
    "pet",
    {
      name: DataTypes.STRING,
      gender: DataTypes.STRING,
      species: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      breeder: DataTypes.INTEGER,
      about_pet: DataTypes.STRING
    },
    {}
  );
  pet.associate = function(models) {
    pet.belongsTo(models.age, {
      as: "petAge",
      foreignKey: "age"
    });
    pet.belongsTo(models.species, {
      as: "petSpecies",
      foreignKey: "species"
    });
    pet.belongsTo(models.user, {
      as: "owner",
      foreignKey: "breeder"
    });
  };
  return pet;
};
