const jwt = require("jsonwebtoken");
const models = require("../models");
const User = models.user;

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findOne({ where: { id: data.user_id } });
    if (!user) {
      throw new Error();
    }
    req.user = user.id;
    req.token = token;
    next();
    console.log(req.user);
  } catch (err) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};

exports.authAdmin = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const data = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await User.findOne({ where: { id: data.user_id } });
    if (admin.status !== "admin") {
      throw new Error();
    }
    req.admin = admin.id;
    req.tokenAdmin = token;
    next();
  } catch (err) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
