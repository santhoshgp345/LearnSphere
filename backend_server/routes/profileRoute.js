const express = require('express');
const router = express.Router();

// import route handlers
const {updateProfile,deleteAccount , getUserData, getEnrolledCourses,instructorDetails} = require('../controllers/profileHandler.js');
const {auth, isInstructor} = require('../middlewares/auth.js');


// map with the handler
router.put("/update",auth,updateProfile);
router.delete("/delete",auth,deleteAccount);
router.get("/get-data",auth,getUserData);
router.get("/enrolled-courses",auth,getEnrolledCourses);
router.get("/get-instructor-data",auth,isInstructor,instructorDetails);

// also made route and its handler for update display picture, get enrolled courses

module.exports = router;