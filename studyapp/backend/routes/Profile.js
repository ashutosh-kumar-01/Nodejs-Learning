const express = require("express");
const router = express.Router();

const {
	updateProfile,
	deleteAccount,
	getAllUserDetails,
} = require("../controllers/Profile");
const { auth } = require("../middlewares/auth");

router.put("/update", auth, updateProfile);
router.delete("/delete", auth, deleteAccount);
router.get("/me", auth, getAllUserDetails);

module.exports = router;