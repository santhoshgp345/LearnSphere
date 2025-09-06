const SubSection = require('../models/SubSection.js');
const Section = require('../models/Section.js');
const uploadImageToCloud = require('../utils/imageUploader.js');
const Course = require('../models/Course.js');
require('dotenv').config();

// createSubSection
exports.createSubSection = async(req ,res) => {
    try{
        // fetch subSection data from req body and video from req file
        // console.log("🚀 Full Request Files:", req.files); // Debugging

        const { sectionId, title, description, courseId } = req.body;
        // console.log("SECTION Id Received:", sectionId);

        const videoFile = req.files?.videoFile;
        // console.log("videoFile:", videoFile || "No file received");


        // validate data
        if(!sectionId || !title  || !description || !videoFile || !courseId){
            return res.status(500).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // upload video to cloudinary
        const uploadVideo = await uploadImageToCloud(videoFile,process.env.FOLDER_NAME);
        // console.log("Cloudinary Response:", uploadVideo);


        // get secure_url from cloudinary
        // create subSection entry to DB
        const subSection = await SubSection.create({
            title,
            description,
            videoUrl:uploadVideo.secure_url
        })

        // update Section with subSection
        await Section.findByIdAndUpdate(sectionId,{$push: {subSection:subSection._id}},{new:true});
        const course = await Course.findById(courseId).populate(
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

        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection created Successfully",
            course
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"SubSection creation failed, try again"
        })
    }
}

// updateSubSection
exports.updateSubSection = async(req ,res) => {
    try{
        // fetch subSection data from req body and video from req file
        const {subSectionId ,title,timeDuration,description} = req.body;

        const videoFile = req.files.videoFile;

        // validate data
        if(!subSectionId || !title || !timeDuration || !description || !videoFile){
            return res.status(500).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // upload video to cloud
        const uploadVideo = await uploadImageToCloud(videoFile,process.env.FOLDER_NAME);

        // update subSection
        const subSection = await SubSection.findByIdAndUpdate(subSectionId,{
            title:title,
            timeDuration:timeDuration,
            description: description,
            videoUrl: uploadVideo.secure_url
        },{new:true});

        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection updated Successfully",
            SubSection:subSection
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"SubSection updation failed, try again"
        })
    }
}

// deleteSubSection
exports.deleteSubSection = async(req ,res) => {
    try{
        // fetch sectionId - assuming ID send in params from frontend
        const {subSectionId,sectionId} = req.body;

        // validate data
        if(!sectionId || !subSectionId){
            return res.status(500).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // delete section Data in DB
        await SubSection.findByIdAndDelete(subSectionId);

        // remove the entry of subSection in section
        await Section.findByIdAndUpdate(sectionId,{$pull : {subSection : subSectionId}},{new:true})

        // return response
        return res.status(200).json({
            success:true,
            message:"SubSection deleted Successfully"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"SubSection deletion failed, try again"
        })
    }
}