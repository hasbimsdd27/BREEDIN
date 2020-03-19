const jwt = require("jsonwebtoken");
const models = require("../models");
const Age = models.age;

exports.loadAllAges = async (req, res) => {
  try {
    const data = await Age.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }
    });
    res.status(200).send({
      status: true,
      message: "all ages successfully getted",
      data
    });
  } catch (err) {
    console.log(err);
  }
};
