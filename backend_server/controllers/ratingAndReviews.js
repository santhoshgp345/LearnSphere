const RatingAndReviews = require('../models/RatingAndReviews.js');
const User = require('../models/User.js');
const Course = require('../models/Course.js');
const mongoose = require('mongoose');

// create rating and reviews
exports.createRandR = async(req ,res) => {
    try{
        // fetch user id 
        const userId = req.user.id;

        // fetch rating credentials and course id
        const {courseId,rating,review} = req.body;

        // console.log("USER ID ",userId)
        // console.log("COURSE ID ",courseId)
        // console.log("Rating and Review ",rating,review)

        // validate
        if(!userId || !rating || !courseId){
            return res.status(400).json({
                success:false,
                message:"all fields are mandatory"
            })
        }

        // check user Enrolled in course or not
        const course = await Course.findById(courseId);
        if(!course.studentsEnrolled.includes(userId)){
            return res.status(400).json({
                success:false,
                message:"User not enrolled in Course"
            })
        }

        // check if user already rating and reviews
        const alreadyReviewed = await RatingAndReviews.findOne({user:userId,course:courseId});
        if(alreadyReviewed){
            return res.status(400).json({
                success:false,
                message:"User already reviewed Course"
            })
        }

        /* if(course.ratingAndReviews.includes({user:userId})){
            return res.status(400).json({
                success:false,
                message:"User already reviewed Course"
            })
        } */

        // create rating and reviews entry in DB
        const ratingReview = await RatingAndReviews.create({
            user:userId,
            course:courseId,
            rating:rating,
            review:review
        })

        // update course rating reviews
        course.ratingAndReviews.push(ratingReview._id)
        await course.save();

        // return response
        return res.status(200).json({
            success:true,
            message:"Rating created Successfully"
        })

    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Rating creation failed"
        })
    }
}

// get Average Rating
exports.getAverageRating = async(req ,res) => {
    try{
        // fetch course id
        const courseId = req.body.courseId;

        // find rating data and calculate average rating
        // match with course id in Rating DB 
        // those mached are grouped on id basis and,average calculated on rating and return in resultRating in array format
        const resultRating = await RatingAndReviews.aggregate([
            {
                $match:{
                    course: new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    averageRating: { $avg: "$rating"}
                }
            }
        ])

        // check and return rating
        if(resultRating.length > 0){
            return res.status(200).json({
                success:true,
                message:"Average Rating calculated",
                averageRating: resultRating[0]
            })
        }

        // in case no rating there found - return zero rating
        return res.status(200).json({
            success:true,
            message:"Average Rating calculated",
            averageRating: 0
        })

    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Average rating not calculated, try again"
        })
    }
}

// get All Rating and reviews
exports.getAllRatingsandR = async(req,res) => {
    try{
        const allReviews = await RatingAndReviews.find({})
                                                .sort({rating: "desc"})
                                                .populate({
                                                    path:"user",
                                                    select:"firstName lastName email image"
                                                })
                                                .populate({
                                                    path:"course",
                                                    select:"courseName"
                                                })
                                                .exec();
    
        return res.status(200).json({
            success:true,
            message:"All reviews fetched successfully",
            data: allReviews
        })
        
    }catch(err){
        console.log(err)
        return res.status(400).json({
            success:false,
            message:"Error in fetching Rating and Reviews, try again"
        })
    }
}