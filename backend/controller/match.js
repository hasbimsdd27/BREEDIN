const models = require("../models");
const Pet = models.pet;
const Photo = models.photos;
const User = models.user;
const Species = models.species;
const Age = models.age;
const Match = models.match;
const { Op } = require("sequelize");

exports.checkMatch = async (req, res) => {
  try {
    const { pet_id, pet_id_liked } = req.query;
    let data = "";
    if (pet_id === pet_id_liked) {
      res.status(403).send({ message: "matching same pet id is disallowed" });
    } else {
      let data1 = await Match.findOne({
        where: { pet: pet_id, pet_liked: pet_id_liked },
        include: [
          {
            model: Pet,
            as: "originPet",
            attributes: {
              exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                  exclude: ["email", "password", "createdAt", "updatedAt"]
                }
              }
            ]
          },
          {
            model: Pet,
            as: "likedPet",
            attributes: {
              exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                  exclude: ["email", "password", "createdAt", "updatedAt"]
                }
              }
            ]
          }
        ],
        attributes: { exclude: ["pet", "pet_liked"] }
      });
      if (data1) {
        data = data1;
        res.status(200).send({ message: "data found", data });
      } else {
        let data2 = await Match.findOne({
          where: { pet: pet_id_liked, pet_liked: pet_id },
          include: [
            {
              model: Pet,
              as: "originPet",
              attributes: {
                exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                    exclude: ["email", "password", "createdAt", "updatedAt"]
                  }
                }
              ]
            },
            {
              model: Pet,
              as: "likedPet",
              attributes: {
                exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                    exclude: ["email", "password", "createdAt", "updatedAt"]
                  }
                }
              ]
            }
          ],
          attributes: { exclude: ["pet", "pet_liked"] }
        });
        if (data2) {
          data = data2;
          res.status(200).send({ message: "data found", data });
        } else {
          res.status(204).send();
        }
      }
    }
  } catch (err) {}
};

exports.createMatch = async (req, res) => {
  const { pet_id, pet_id_liked, status } = req.body;
  try {
    let dataPet = await Pet.findOne({
      where: { id: pet_id }
    });

    if (dataPet.breeder === req.user) {
      let dataLikedPet = await Pet.findOne({
        where: { id: pet_id_liked }
      });

      if (!dataLikedPet) {
        res.status(404).send({ message: "liked pet id not found" });
      } else {
        if (dataLikedPet.breeder === req.user) {
          res.status(403).send({
            message: "you can only match your with other breeder's pet"
          });
        } else {
          const matchInput = await Match.create({
            pet: pet_id,
            pet_liked: pet_id_liked,
            status
          });
          const dataMatch = await Match.findOne({
            where: { pet: pet_id, pet_liked: pet_id_liked, status },
            include: [
              {
                model: Pet,
                as: "originPet",
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "species",
                    "age",
                    "breeder"
                  ]
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
                      exclude: ["email", "password", "createdAt", "updatedAt"]
                    }
                  }
                ]
              },
              {
                model: Pet,
                as: "likedPet",
                attributes: {
                  exclude: [
                    "createdAt",
                    "updatedAt",
                    "species",
                    "age",
                    "breeder"
                  ]
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
                      exclude: ["email", "password", "createdAt", "updatedAt"]
                    }
                  }
                ]
              }
            ],
            attributes: { exclude: ["pet", "pet_liked"] }
          });
          res.status(200).send(dataMatch);
        }
      }
    } else {
      res.status(403).send({ message: "you can only match your pet(s)" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const dataMatch = await Match.findOne({
      where: { id }
    });
    if (dataMatch) {
      const updateMatch = await Match.update(
        {
          status,
          updatedAt: new Date()
        },
        { where: { id } }
      );
      const dataMatch2 = await Match.findOne({
        where: { id },
        include: [
          {
            model: Pet,
            as: "originPet",
            attributes: {
              exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                  exclude: ["email", "password", "createdAt", "updatedAt"]
                }
              }
            ]
          },
          {
            model: Pet,
            as: "likedPet",
            attributes: {
              exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                  exclude: ["email", "password", "createdAt", "updatedAt"]
                }
              }
            ]
          }
        ],
        attributes: { exclude: ["pet", "pet_liked"] }
      });
      let data = dataMatch2;
      res.status(200).send({ message: "Status successfully updated", data });
    } else {
      res.status(404).send({ message: "Match id not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getMatched = async (req, res) => {
  try {
    const { pet_id } = req.query;
    const status = true;
    let dataMatch1 = await Match.findAll({
      where: { pet: pet_id, status },
      include: [
        {
          model: Pet,
          as: "originPet",
          attributes: {
            exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                exclude: ["email", "password", "createdAt", "updatedAt"]
              }
            }
          ]
        },
        {
          model: Pet,
          as: "likedPet",
          attributes: {
            exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                exclude: ["email", "password", "createdAt", "updatedAt"]
              }
            }
          ]
        }
      ],
      attributes: { exclude: ["pet", "pet_liked"] }
    });
    let dataMatch2 = await Match.findAll({
      where: { pet_liked: pet_id, status },
      include: [
        {
          model: Pet,
          as: "originPet",
          attributes: {
            exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                exclude: ["email", "password", "createdAt", "updatedAt"]
              }
            }
          ]
        },
        {
          model: Pet,
          as: "likedPet",
          attributes: {
            exclude: ["createdAt", "updatedAt", "species", "age", "breeder"]
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
                exclude: ["email", "password", "createdAt", "updatedAt"]
              }
            }
          ]
        }
      ],
      attributes: { exclude: ["pet", "pet_liked"] }
    });
    let data = Object.assign(dataMatch1, dataMatch2);
    res.status(200).send({ message: "all match getted", data });
  } catch (err) {
    console.log(err);
  }
};
