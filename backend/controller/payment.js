const models = require("../models");
const Payment = models.payment;
const User = models.user;

exports.sendPayment = async (req, res) => {
  try {
    const { no_rek, proof_of_transfer, user, status } = req.body;
    const paymentInput = await Payment.create({
      no_rek,
      proof_of_transfer,
      user,
      status
    });
    if (paymentInput) {
      let paymentData = await Payment.findOne({
        where: {
          no_rek,
          proof_of_transfer,
          user,
          status
        },
        include: [
          {
            model: User,
            as: "userDetail",
            attributes: {
              exclude: ["email", "password", "createdAt", "updatedAt"]
            }
          }
        ],
        attributes: { exclude: ["user"] }
      });
      res.status(200).send(paymentData);
    } else {
      throw new Error();
    }
    res.send();
  } catch (err) {
    console.log(err);
  }
};

exports.updatePayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { no_rek, proof_of_transfer, user, status } = req.body;
    const updatePay = await Payment.update(
      {
        no_rek,
        proof_of_transfer,
        user,
        status
      },
      { where: { id } }
    );
    if (updatePay) {
      let paymentData = await Payment.findOne({
        where: {
          id
        },
        include: [
          {
            model: User,
            as: "userDetail",
            attributes: {
              exclude: ["email", "password", "createdAt", "updatedAt"]
            }
          }
        ],
        attributes: { exclude: ["user"] }
      });
      res.status(200).send(paymentData);
    } else {
      throw new err();
    }
  } catch (err) {
    console.log(err);
  }
};
