const express = require("express");
const router = express.Router();

const {
	createCourse,
	getAllCourses,
	getCourseDetails,
} = require("../controllers/Course");
const {
	createCategory,
	showAllCategories,
	categoryPageDetails,
} = require("../controllers/Category");
const {
	createSection,
	updateSection,
	deleteSection,
} = require("../controllers/Section");
const {
	createSubSection,
	updateSubSection,
	deleteSubSection,
} = require("../controllers/Subsection");
const {
	createRating,
	getAverageRating,
	getAllRating,
} = require("../controllers/RatingAndReview");
const { auth, isInstructor, isStudent, isAdmin } = require("../middlewares/auth");

router.post("/course", auth, isInstructor, createCourse);
router.get("/courses", getAllCourses);
router.post("/course/details", getCourseDetails);

router.post("/category", auth, isAdmin, createCategory);
router.get("/categories", showAllCategories);
router.post("/category/details", categoryPageDetails);

router.post("/section", auth, isInstructor, createSection);
router.put("/section", auth, isInstructor, updateSection);
router.delete("/section", auth, isInstructor, deleteSection);

router.post("/subsection", auth, isInstructor, createSubSection);
router.put("/subsection", auth, isInstructor, updateSubSection);
router.delete("/subsection", auth, isInstructor, deleteSubSection);

router.post("/rating", auth, isStudent, createRating);
router.post("/rating/average", getAverageRating);
router.get("/ratings", getAllRating);

module.exports = router;