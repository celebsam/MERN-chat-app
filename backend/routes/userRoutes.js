const express = require("express");
const { login, register, allUsers } = require("../controllers/userControllers");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.route("/").post(register).get(protect, allUsers);
router.route("/login").post(login);

module.exports = router;
