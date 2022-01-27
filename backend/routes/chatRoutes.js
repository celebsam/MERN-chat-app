const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { accessChat } = require("../controllers/chatControllers");

const router = express.Router();

router.route("/").post(protect, accessChat);
// router.route("/").get(protect, fetchChats);
// router.route("/group").post(protect, createGroupChat);
// router.route("rename").patch(protect, renameGroup);
// router.route("groupremove").patch(protect, removeFromGroup);
// router.route("groupadd").patch(protect, addToGroup);

module.exports = router;
