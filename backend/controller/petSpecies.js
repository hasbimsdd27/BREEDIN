const jwt = require("jsonwebtoken");
const models = require("../models");
const Species = models.species;

exports.createSpecies = async (req, res) => {
  const { name } = req.body;
  try {
    const speciesInput = await Species.create({ name });
    res.status(200).send({
      message: "pet species added",
      data: { id: speciesInput.id, name: speciesInput.name }
    });
  } catch (err) {
    console.log(err);
  }
};

exports.loadAllSpecies = async (req, res) => {
  try {
    const data = await Species.findAll();
    res.status(200).send({
      message: "all species successfully getted",
      data
    });
  } catch (err) {
    console.log(err);
  }
};
