const express = require("express");
const router = express.Router();

// controller import karna hai
const {localFileUpload} = require("../controllers/fileupload");


// api route
router.post("/localfileupload", localFileUpload);

module.exports = router;