const express = require("express");
const { auth } = require("../middlewares/auth");
const {
  registerUser,
  loginUser,
  getMyProfile,
  updateProfile,
  updateAvatar,
} = require("../controllers/userController");
const upload = require("../middlewares/multer");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/my-profile", auth, getMyProfile);
router.patch("/update-profile", auth, updateProfile);
router.patch("/update-avatar", upload, auth, updateAvatar);

module.exports = router;
