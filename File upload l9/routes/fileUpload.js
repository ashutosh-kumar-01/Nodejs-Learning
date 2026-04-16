const express = require("express");
const router = express.Router();

// controller import karna hai
const {localFileUpload, imageUpload} = require("../controllers/fileupload");


// api route
router.post("/localfileupload", localFileUpload);
router.post("/imageupload", imageUpload);

module.exports = router;