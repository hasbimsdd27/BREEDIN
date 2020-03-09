"use strict";
module.exports = (sequelize, DataTypes) => {
  const photos = sequelize.define(
    "photos",
    {
      pet: DataTypes.INTEGER,
      path: DataTypes.STRING
    },
    {}
  );
  photos.associate = function(models) {
    photos.belongsTo(models.pet, {
      as: "idPhoto",
      foreignKey: "id"
    });
  };
  return photos;
};
