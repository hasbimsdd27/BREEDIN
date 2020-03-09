const models = require("../models");
const Pet = models.pet;
const Photo = models.photos;
const User = models.user;
const Species = models.species;
const Age = models.age;
const Match = models.match;

exports.algoMatch = async (req, res) => {
  try {
    const { pet_id, pet_id_liked } = req.query;
    const dataMatch = await Match.findOne({
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

    const dataMatched = await Match.findOne({
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

    if (!dataMatch && !dataMatched) {
      const matchInput = await Match.create({
        pet: pet_id,
        pet_liked: pet_id_liked,
        status: false
      });

      res.status(204).send(dataMatch);
    } else {
      if (dataMatch.status == false || dataMatch.status == 0) {
        const updateMatch = await Match.update(
          {
            status: true,
            updatedAt: new Date()
          },
          { where: { pet: pet_id_liked, pet_liked: pet_id } }
        );

        const dataMatch2 = await Match.findOne({
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
        res
          .status(200)
          .send({ message: "status updated to true", data: dataMatch2 });
      } else {
        res.status(200).send({ message: "data found", data: dataMatch });
      }
    }
  } catch (err) {
    console.log(err);
  }
};
