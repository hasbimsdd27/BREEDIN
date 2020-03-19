const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;
const Pet = models.pet;
const Admin = models.admin;
const bcrypt = require("bcrypt");
const Payment = models.payment;

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
          status: true,
          message: "login success",
          data: { email: user.email, status: user.status, token: token }
        });
      } else {
        res.status(401).send({ status: false, message: "invalid login" });
      }
    } else {
      res.status(401).send({ status: false, message: "invalid login" });
    }
  } catch (err) {
    res.status(401).send({ status: false, message: "invalid login" });
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
      await User.create({
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
      await Payment.create({
        no_rek: null,
        proof_of_transfer: null,
        user: breederData.id,
        status: "free",
        createdAt: new Date(),
        updatedAt: new Date()
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
        data: {
          email: breederData.email,
          status: breederData.status,
          token: token
        }
      });
    } else {
      res.status(409).send({ message: "email already registered" });
    }
  } catch (err) {
    console.log(err);
  }
};
