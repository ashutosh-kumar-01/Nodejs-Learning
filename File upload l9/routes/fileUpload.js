const express = require("express");
const router = express.Router();

// controller import karna hai
const {localFileUpload, imageUpload, videoUpload,imageSizeReducer} = require("../controllers/fileupload");


// api route
router.post("/localfileupload", localFileUpload);
router.post("/imageupload", imageUpload);
router.post("/videoupload", videoUpload);
router.post("/imageSizeReducer", imageSizeReducer);

module.exports = router;