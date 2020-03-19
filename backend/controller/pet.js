const jwt = require("jsonwebtoken");
const models = require("../models");
const Pet = models.pet;
const Photo = models.photos;
const User = models.user;
const Species = models.species;
const Age = models.age;
const Payment = models.payment;

exports.addPet = async (req, res) => {
  const { name, gender, species, age, about_pet } = req.body;
  let datetime = new Date();
  console.log({ name, gender, species, age, about_pet });
  let user = req.user;
  try {
    const premium = await Payment.findOne({
      where: { user }
    });
    if (!premium || premium.status == "free") {
      res.status(403).send({
        message: "you are not premium user"
      });
    } else {
      const petInput = await Pet.create({
        name,
        gender,
        species,
        age,
        breeder: user,
        about_pet,
        createdAt: datetime,
        updatedAt: datetime
      });
      if (!petInput) {
        throw new Error();
      }

      let petData = await Pet.findOne({
        where: {
          name,
          gender,
          species,
          age,
          about_pet
        },
        include: [
          {
            model: Species,
            as: "petSpecies",
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
          {
            model: Age,
            as: "petAge",
            attributes: { exclude: ["createdAt", "updatedAt"] }
          },
          {
            model: User,
            as: "owner",
            attributes: {
              exclude: ["password", "createdAt", "updatedAt"]
            }
          }
        ],
        attributes: { exclude: ["species", "age", "breeder"] }
      });

      res.status(201).send({
        message: "successfuly add pet",
        data: petData
      });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.loadAllPet = async (req, res) => {
  try {
    const breeder = req.user;
    console.log(breeder);
    const allPet = await Pet.findAll({
      where: { breeder },
      include: [
        {
          model: Species,
          as: "petSpecies",
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        {
          model: Age,
          as: "petAge",
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        {
          model: User,
          as: "owner",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"]
          }
        }
      ],
      attributes: { exclude: ["species", "age", "breeder"] }
    });

    res
      .status(200)
      .send({ status: true, message: "get all pet success", data: allPet });
  } catch (err) {
    console.log(err);
  }
};

exports.updatePet = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const { name, gender, age, about_pet } = req.body;
    let dataPet = await Pet.findOne({
      where: { id }
    });
    console.log(dataPet);
    if (!dataPet) {
      res.status(404).send({ message: "Data not found" });
    } else {
      if (dataPet.breeder !== req.user) {
        res
          .status(401)
          .send({ message: "You are not allowed to access this data" });
      } else {
        await Pet.update(
          {
            name,
            gender,
            age: age,
            about_pet,
            updatedAt: new Date()
          },
          { where: { id } }
        );

        let petData2 = await Pet.findOne({
          where: {
            name,
            gender,
            age,
            breeder: req.user
          },
          include: [
            {
              model: Species,
              as: "petSpecies",
              attributes: { exclude: ["createdAt", "updatedAt"] }
            },
            {
              model: Age,
              as: "petAge",
              attributes: { exclude: ["createdAt", "updatedAt"] }
            },
            {
              model: User,
              as: "owner",
              attributes: {
                exclude: ["password", "createdAt", "updatedAt"]
              }
            }
          ],
          attributes: { exclude: ["species", "age", "breeder"] }
        });
        let data = petData2;
        res.status(200).send({ message: "data successfully updated", data });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.deletePet = async (req, res) => {
  try {
    const { id } = req.params;
    let dataPet = await Pet.findOne({
      where: { id }
    });

    if (!dataPet) {
      res.status(404).send({ message: "Data not found" });
    } else {
      if (dataPet.breeder !== req.user) {
        res
          .status(401)
          .send({ message: "You are not allowed to access this data" });
      } else {
        const petDelete = await Pet.destroy({ where: { id } });
        res.status(200).send({ message: "data successfully deleted", id });
      }
    }
  } catch (err) {
    console.log(err);
  }
};

exports.detailPet = async (req, res) => {
  try {
    const { id } = req.params;
    let petData = await Pet.findOne({
      where: { id },
      attributes: {
        exclude: ["species", "age", "breeder"]
      },
      include: [
        {
          model: Species,
          as: "petSpecies",
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        {
          model: Age,
          as: "petAge",
          attributes: { exclude: ["createdAt", "updatedAt"] }
        },
        {
          model: User,
          as: "owner",
          attributes: {
            exclude: ["password", "createdAt", "updatedAt"]
          }
        }
      ]
    });
    if (petData.id == id) {
      res.status(200).send({
        status: true,
        message: "get detail pet success",
        data: petData
      });
    } else {
      res.status(404).send({ message: "data not found" });
    }
  } catch (err) {
    console.log(err);
  }
};
