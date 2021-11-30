const express = require("express");
const { login, register } = require("../controllers/userControllers");

const router = express.Router();

router.route("/").post(register);
router.route("/login").post(login);

module.exports = router;
