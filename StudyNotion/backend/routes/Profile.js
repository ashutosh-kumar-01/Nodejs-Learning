const express = require("express");
const router = express.Router();

const {
	updateProfile,
	updateDisplayPicture,
	deleteAccount,
	getAllUserDetails,
} = require("../controllers/Profile");
const { auth } = require("../middlewares/auth");

router.put("/update", auth, updateProfile);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);
router.delete("/delete", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);

module.exports = router;