"use strict";
module.exports = (sequelize, DataTypes) => {
  const payment = sequelize.define(
    "payment",
    {
      no_rek: DataTypes.STRING,
      proof_of_transfer: DataTypes.STRING,
      user: DataTypes.INTEGER,
      status: DataTypes.ENUM("free", "premium")
    },
    {}
  );
  payment.associate = function(models) {
    payment.belongsTo(models.user, {
      as: "userDetail",
      foreignKey: "user"
    });
  };
  return payment;
};
