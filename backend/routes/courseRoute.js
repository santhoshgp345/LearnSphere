const express = require('express');
const { verifySignature } = require('../controllers/paymentHandler');
const router = express.Router();

// import route handlers
const {auth, isInstructor, isAdmin, isStudent} = require('../middlewares/auth.js');
const {createCourse, getCourseDetail,editCourse,showAllCourses,getInstructorCourses,deleteCourse} = require('../controllers/courseHandler.js');
const {createSection, updateSection, deleteSection} = require('../controllers/sectionHandler.js');
const {createSubSection, updateSubSection, deleteSubSection} = require('../controllers/subSectionHandler.js');

const {createCategory,getAllCategories,getCourseByCategory} = require('../controllers/categoryHandler.js');

const {createRandR,getAverageRating,getAllRatingsandR} = require('../controllers/ratingAndReviews.js');

// map with the handler
router.post("/create-course",auth,isInstructor,createCourse);
router.post("/edit-course",auth,isInstructor,editCourse);
router.delete("/deleteCourse",auth,isInstructor,deleteCourse);

router.post("/add-section",auth,isInstructor,createSection);
router.put("/update-section",auth,isInstructor,updateSection);
router.delete("/delete-section",auth,isInstructor,deleteSection);

// sub section
router.post("/add-subsection",auth,isInstructor,createSubSection);
router.put("/update-subsection",auth,isInstructor,updateSubSection);
router.delete("/delete-subsection",auth,isInstructor,deleteSubSection);

router.get("/get-course-detail",getCourseDetail);
router.get("/get-all-courses",showAllCourses);
router.get("/get-instructor-courses",auth,isInstructor,getInstructorCourses);

// category routes
router.post("/create-category",auth,isAdmin,createCategory);
router.get("/get-all-categories",getAllCategories);
router.get("/get-categorisedCourses",getCourseByCategory);

// ratings and reviews
router.post("/create-reviews",auth,isStudent,createRandR);
router.get("/get-average-rating",getAverageRating);
router.get("/get-all-reviews",getAllRatingsandR);

module.exports = router;