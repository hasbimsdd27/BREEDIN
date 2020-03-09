const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;
const Pet = models.pet;
const Admin = models.admin;
const bcrypt = require("bcrypt");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      let verifikasi = bcrypt.compareSync(password, user.password);
      if (verifikasi) {
        const token = jwt.sign(
          { user_id: user.id, user_name: user.breeder },
          process.env.SECRET_KEY
        );
        res.status(200).send({
          message: "login success",
          data: { email: user.email, token: token }
        });
      } else {
        res.status(401).send({ message: "invalid login" });
      }
    } else {
      res.status(401).send({ message: "invalid login" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.register = async (req, res) => {
  const { breeder, email, password, phone, address, pet } = req.body;
  try {
    let breederData = await User.findOne({
      where: {
        email
      }
    });
    if (!breederData) {
      let hash = bcrypt.hashSync(password, 10);
      const breederInput = await User.create({
        breeder,
        email,
        password: hash,
        phone,
        address,
        status: "user",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      breederData = await User.findOne({
        where: {
          breeder,
          email,
          phone,
          address
        }
      });
      const token = jwt.sign(
        { user_id: breederData.id, user_name: breederData.breeder },
        process.env.SECRET_KEY
      );

      let petAge = pet.ageid;
      const petInput = await Pet.create({
        name: pet.name,
        gender: pet.gender,
        species: pet.spesies.id,
        age: pet.age.id,
        breeder: breederData.id,
        about_pet: "",
        createdAt: new Date(),
        updatedAt: new Date()
      });
      let data = breederData;
      res.status(201).send({
        message: "successfully registered",
        data
      });
    } else {
      res.status(409).send({ message: "email already registered" });
    }
  } catch (err) {
    console.log(err);
  }
};
