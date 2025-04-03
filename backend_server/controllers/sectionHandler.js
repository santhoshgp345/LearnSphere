const Section = require('../models/Section.js');
const Course = require('../models/Course.js');

// create Section handler
exports.createSection = async(req ,res) => {
    try{
        // fetch section name and course of it
        
        const {sectionName, courseId} = req.body;

        // validate data
        if(!sectionName || !courseId){
            return res.status(500).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // create section entry in DB
        const newSection = await Section.create({sectionName:sectionName});

        // update section ID in course entry in DB
        const updatedCourse = await Course.findByIdAndUpdate(courseId,{$push : {courseContent:newSection._id}},{new:true}).populate("courseContent")
        // use populate to show section and subsection acually not its ID

        // return response
        return res.status(200).json({
            success:true,
            message:"Section created Successfully",
            course: updatedCourse
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Section creation failed, try again"
        })
    }
}

// update Section handler
exports.updateSection = async(req ,res) => {
    try{
        // fetch section
        const {sectionName,sectionId,courseId} = req.body;

        // validate data
        if(!sectionName || !sectionId || !courseId){
            return res.status(500).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // update section Data in DB
        const updatedSection = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true});
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
            message:"Section updated Successfully",
            course
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Section update failed, try again"
        })
    }
}

// delete Section handler
exports.deleteSection = async(req ,res) => {
    try{
        // fetch sectionID - assuming ID send in params from frontend
        const {sectionId,courseId} = req.body;

        // validate data
        if(!sectionId || !courseId){
            return res.status(500).json({
                success:false,
                message:"All fields are mandatory"
            })
        }

        // delete section Data in DB
        await Section.findByIdAndDelete(sectionId);

        // remove the entry of section in Course
        const course = await Course.findByIdAndUpdate(courseId,{$pull : {courseContent : sectionId}},{new:true}).populate(
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
            message:"Section deleted Successfully",
            course
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Section deletion failed, try again"
        })
    }
}