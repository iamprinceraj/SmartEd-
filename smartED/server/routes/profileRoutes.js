const express = require("express");
const router = express.Router();

//Profile Handlers
const {
  updateProfile,
  deleteProfile,
  getUserDetails,
  uploadDisplayPicture,
} = require("../controllers/profile");

// MiddleWares
const { auth } = require("../middlewares/authoriseUser");

//define Routes
router.post("/updateProfile", auth, updateProfile);
router.post("/deleteProfile", auth, deleteProfile);
router.get("/getUserDetails", auth, getUserDetails);
router.post("/updateDisplayPicture", auth, uploadDisplayPicture);

// **************** enrolled courses ************8
// router.post("/getEnrolledCourses", auth , )

module.exports = router;
