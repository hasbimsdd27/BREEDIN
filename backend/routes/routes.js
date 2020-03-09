const express = require("express");
const router = express.Router();
const { login, register } = require("../controller/auth");
const { createSpecies, loadAllSpecies } = require("../controller/petSpecies");
const { auth, authAdmin } = require("../middleware/auth");
const { algoMatch } = require("../controller/algoMatch");
const {
  addPet,
  loadAllPet,
  updatePet,
  deletePet,
  detailPet
} = require("../controller/pet");
const { detailUser, editUser, deleteUser } = require("../controller/user");
const {
  checkMatch,
  createMatch,
  updateMatch,
  getMatched
} = require("../controller/match");
const { sendPayment, updatePayment } = require("../controller/payment");

router.post("/login", login);

router.post("/register", register);

router.post("/species", createSpecies);
router.get("/species", loadAllSpecies);

router.post("/pet", auth, addPet);
router.get("/pets", loadAllPet);
router.patch("/pet/:id", auth, updatePet);
router.get("/pet/:id", detailPet);
router.delete("/pet/:id", auth, deletePet);

router.get("/user/:id", auth, detailUser);
router.patch("/user/:id", auth, editUser);
router.delete("/user/:id", auth, deleteUser);

router.get("/match", auth, checkMatch);
// router.get("/match", auth, algoMatch);
router.post("/match", auth, createMatch);
router.patch("/match/:id", auth, updateMatch);
router.get("/matches", auth, getMatched);

router.post("/payment", authAdmin, sendPayment);
router.put("/payment/:id", authAdmin, updatePayment);
module.exports = router;
