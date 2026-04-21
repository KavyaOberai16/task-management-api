//this file is only used for writing routes name in this file only authRoutes

const express = require(`express`);
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authControllers");

router.post("/register", registerUser);
router.post("/login", loginUser)

module.exports = router;