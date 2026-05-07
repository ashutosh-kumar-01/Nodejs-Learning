const express = require("express");
const router = express.Router();

const { capturePayment, verifySignature } = require("../controllers/Payments");
const { auth, isStudent } = require("../middlewares/auth");

router.post("/capture", auth, isStudent, capturePayment);
router.post("/verify", verifySignature);

module.exports = router;