const CourseProgress = require('../models/CourseProgress.js');
const Profile = require('../models/Profile.js');
const User = require('../models/User.js');

// as Profile reated already at the time of sign so we made update profile handler directly

exports.updateProfile = async(req ,res) => {
    try{
        // fetch profile Data and userId from req body

        const {firstName,lastName,gender, dateOfBirth="",countryCode="+91", contactNo,about=""} = req.body.formData;

        const userId = req.user.id;
        // console.log("USER : ",req.body.formData);       

        // validate data
        if(!contactNo || !countryCode || !gender || !userId ){
            return res.status(400).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // find Profile in DB
        const user = await User.findByIdAndUpdate(userId,{firstName:firstName,lastName:lastName},{new:true});
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        const profileId = user.additionalDetails;

        // update profile in DB
        const updatedProfile = await Profile.findByIdAndUpdate(profileId,{gender:gender,dateOfBirth:dateOfBirth,countryCode:countryCode,contactNo: contactNo,about:about},{new:true})

        // return response
        return res.status(200).json({
            success:true,
            message:"Profile updated Successfully",
            profile:updatedProfile,
            user: user
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Profile Updation failed, try again"
        })
    }
}

// delete Account handler
exports.deleteAccount = async(req ,res) => {
    try{
        // get id
        const userId = req.user.id;

        // validate - user exist or not
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found"
            })
        }

        // delete profile - delete user additional details
        await Profile.findByIdAndDelete(user.additionalDetails);

        // delete user 
        await User.findByIdAndDelete(userId);

        // Homework TODO :- unenroll user from all enrolled courses i.e. remove user enrollment

        // return response
        return res.status(200).json({
            success:true,
            message:"Account deleted Successfully"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Profile deletion failed, try again"
        })
    }
}

// get User all Details
exports.getUserData = async(req ,res) => {
    try{
        // get user id
        const userId = req.user.id;

        // validation and get user details
        const userDetails = await User.findById(userId).populate("additionalDetails").exec();

        // return response
        return res.status(200).json({
            success:true,
            message:"User Data fetched Successfully",
            UserData : userDetails
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"User Data fetching failed, try again"
        })
    }
}

exports.getEnrolledCourses = async(req,res) => {
    try{
        const userId = req.user.id;
        // console.log("User Id REceived :",userId);

        const user = await User.findById(userId)
                                        .populate({
                                            path: "courses",
                                            populate: {
                                                path: "courseContent",
                                                populate: {
                                                    path: "subSection"
                                                }
                                            }
                                        })
                                        .populate({
                                            path: "courseProgress",
                                            populate: {
                                                path: "completeVideo"
                                            }
                                        })
                                        .exec();

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not Found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"Account deleted Successfully",
            user: user
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Courses Data fetching failed, try again"
        })
    }
}

// get instructor data
exports.instructorDetails = async (req, res) => {
    try {
        const instructorId = req?.user?.id;
        // console.log("Instructor Id : ",instructorId)
        // Find instructor, populate `additionalDetails` & `courses`
        const instructor = await User.findOne({
            _id: instructorId,
            accountType: "Instructor",
        })
        .populate("additionalDetails") // Fetch profile details
        .populate({
            path: "courses",
            select: "courseName courseDescription price studentsEnrolled",
        });

        // If instructor not found
        if (!instructor) {
            return res.status(404).json({
                success: false,
                message: "Instructor not found",
            });
        }

        return res.status(200).json({
            success: true,
            instructor,
        });

    } catch (error) {
        console.error("Error fetching instructor details:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};