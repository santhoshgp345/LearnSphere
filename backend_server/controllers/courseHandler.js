const Course = require('../models/Course.js');
const Category = require('../models/Category.js');
const User = require('../models/User.js');
const Profile = require('../models/Profile.js');
const uploadImageToCloud = require('../utils/imageUploader.js');
require('dotenv').config();

// create course
exports.createCourse = async(req ,res) => {
    try{
        // fetch course data and file
        // console.log("Fies receive ", req.files);
        const file = req.files?.thumbnailImage;
        // console.log("Thumbnail ", file);

        const {courseName, courseDescription, whatYouWillLearn, price, category, email, status = "Draft" } = req.body; // this tag is an id of tag model
        let tag = req.body.tag ? JSON.parse(req.body.tag) : [];

        // validate data

        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
            return res.status(400).json({
                success:false,
                message:"All Fields are mandatory"
            })
        }


        // validate instructor
        const instructor = await User.findOne({ email: email });
        if(!instructor){
            return res.status(404).json({
                success:false,
                message:"Instructor not Found"
            })
        }

        // validate tag in DB
        const categoryDB = await Category.findById(category);
        if(!categoryDB){
            return res.status(404).json({
                success:false,
                message:"Category not exist"
            })
        }

        // upload thumbnail to cloudinary
        const thumbnailImage = await uploadImageToCloud(file,process.env.FOLDER_NAME,80);
        // console.log("Thumbnail Image :",thumbnailImage)

        // create course entry in DB
        const course = await Course.create({
            courseName,
            courseDescription,
            instructor: instructor._id,
            whatYouWillLearn,
            price,
            category: category,
            tag,
            thumbnail: thumbnailImage.secure_url,
            status: status, 
        })

        // create/update course in User model DB - for instructor course list he made
        // await User.findByIdAndUpdate(userId,{$push : {courses : course._id}},{new: true});
        instructor.courses = course._id;
        await instructor.save();

        // update course entry in Tag
        categoryDB.courses = course._id;
        await categoryDB.save();

        // return response
        return res.status(200).json({
            success:true,
            message:"Course created Successfully",
            course
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in creating Course,try again"
        })
    }
}

// get all courses
exports.showAllCourses = async(req,res) => {
    try{
        // fetch all courses
        // console.log("Show Course")
        const allCourses = await Course.find({},{courseName:true,
                                                 courseDescription:true,
                                                 price:true,
                                                 thumbnail:true,
                                                 instructor:true,
                                                 ratingAndReviews:true,
                                                 studentsEnrolled:true,
                                                 status: true})
                                                 .populate("instructor")
                                                 .exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"Courses fetched Successfully",
            courses: allCourses
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in fetching Course,try again"
        })
    }
}

// get a course complete details
exports.getCourseDetail = async(req,res) => {
    try{
        // fetch course id
      const {courseId} = req.query;
      // console.log("course Id received by controller : ",courseId)

        // validate
        if(!courseId){
            return res.status(404).json({
                success:false,
                message:"Didn't get course details"
            })
        }

        // find course and populate
        const course = await Course.findById(courseId)
                                            .populate(
                                                /*{
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additonalDetails",
                                                    }
                                                }*/
                                               "instructor"
                                            )
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate(
                                                {
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
                                                }
                                            )
                                            .exec();

        // verify
        if(!course){
            return res.status(404).json({
                success:false,
                message:"course not found"
            })
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Course details fetched Successfully",
            course: course
        })


    }catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message:"Error in Finding this course details,trye again"
        })
    }
}

// edit course details
exports.editCourse = async (req, res) => {
    try {
      // Fetch course ID from request
      // console.log("YES Yes Yes Yes")
      const { courseId, courseName, courseDescription, whatYouWillLearn, price, category,status = "Draft" } = req.body;
      let tag = req.body.tag ? JSON.parse(req.body.tag) : [];
      const thumbnail = req.files?.thumbnailImage;

      // console.log("Tags : ",tag)
      // console.log("Category : ",category)

      // console.log("Thumbnail ",thumbnail)

      // Validate if course ID is provided
      if (!courseId) {
        return res.status(400).json({
          success: false,
          message: "Course ID is required",
        });
      }

      // check valid status
      const validStatuses = ["Draft", "Published"];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid course status provided",
            });
      }
  
      // Find course in DB
      let course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
  
      // Validate category if updated
      if (category) {
        const categoryDB = await Category.findById(category);
        if (!categoryDB) {
          return res.status(404).json({
            success: false,
            message: "Category does not exist",
          });
        }
      }
  
      // Upload new thumbnail if provided
      let updatedThumbnail = course.thumbnail;
      if (thumbnail) {
        const thumbnailImage = await uploadImageToCloud(thumbnail, process.env.FOLDER_NAME, 80);
        updatedThumbnail = thumbnailImage.secure_url;
      }
  
      // Update course details
      course.courseName = courseName || course.courseName;
      course.courseDescription = courseDescription || course.courseDescription;
      course.whatYouWillLearn = whatYouWillLearn || course.whatYouWillLearn;
      course.price = price || course.price;
      course.category = category || course.category;
      course.tag = tag || course.tag;
      course.thumbnail = updatedThumbnail;
      course.status = status || course.status;
  
      await course.save();

      course = await Course.findById(courseId)
                                            .populate(
                                                /*{
                                                    path:"instructor",
                                                    populate:{
                                                        path:"additonalDetails",
                                                    }
                                                }*/
                                               "instructor"
                                            )
                                            .populate("category")
                                            .populate("ratingAndReviews")
                                            .populate(
                                                {
                                                    path:"courseContent",
                                                    populate:{
                                                        path:"subSection"
                                                    }
                                                }
                                            )
                                            .exec();
  
      return res.status(200).json({
        success: true,
        message: "Course updated successfully",
        course,
      });
  
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error updating course, please try again",
      });
    }
  };

// get instructor created courses
exports.getInstructorCourses = async (req, res) => {
    try {
      // Extract instructor ID from request (assuming it's set via middleware)
      const instructorId = req.user.id;
  
      // Validate instructor existence
      const instructor = await User.findById(instructorId);
      if (!instructor) {
        return res.status(404).json({
          success: false,
          message: "Instructor not found",
        });
      }
  
      // Fetch all courses created by the instructor
      const courses = await Course.find({ instructor: instructorId })
        .populate("category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec();
  
      // Verify courses exist
      if (courses.length === 0) {
        return res.status(200).json({
          success: true,
          message: "No courses found for this instructor",
          courses: [],
        });
      }
  
      // Return response
      return res.status(200).json({
        success: true,
        message: "Instructor courses fetched successfully",
        courses,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error fetching instructor courses, please try again",
      });
    }
  };

// delete course
exports.deleteCourse = async (req, res) => {
  
    try {
      // Extract course ID from request params
      const {courseId} = req.body;
      // console.log("Course Id " ,courseId);
      const instructorId = req.user.id; // Assuming authentication middleware sets req.user
      // console.log("User ID : ",req.user.id);
  
      // Validate course existence
      const course = await Course.findById(courseId);
      if (!course) {
        return res.status(404).json({
          success: false,
          message: "Course not found",
        });
      }
  
      // Ensure the user is the instructor of this course
      if (course.instructor.toString() !== instructorId) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: You can only delete your own courses",
        });
      }
  
      // Remove course reference from instructor's list
      await User.findByIdAndUpdate(instructorId, {
        $pull: { courses: courseId },
      });
  
      // Remove course reference from category
      await Category.findByIdAndUpdate(course.category, {
        $pull: { courses: courseId },
      });
  
      // Delete the course
      await Course.findByIdAndDelete(courseId);
  
      return res.status(200).json({
        success: true,
        message: "Course deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({
        success: false,
        message: "Error deleting course, please try again",
      });
    }
  };