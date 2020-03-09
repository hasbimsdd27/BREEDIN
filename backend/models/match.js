"use strict";
module.exports = (sequelize, DataTypes) => {
  const match = sequelize.define(
    "match",
    {
      pet: DataTypes.INTEGER,
      pet_liked: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  match.associate = function(models) {
    match.belongsTo(models.pet, {
      as: "originPet",
      foreignKey: "pet"
    });
    match.belongsTo(models.pet, {
      as: "likedPet",
      foreignKey: "pet_liked"
    });
  };
  return match;
};
