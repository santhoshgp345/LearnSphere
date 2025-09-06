const Category = require('../models/Category.js');
const Course = require('../models/Course.js');

exports.createCategory = async(req,res) => {
    try{
        // fetch tagname and description from ui
        const {name,description} = req.body;

        // validate data
        if(!name || !description){
            return res.status(400).json({
                success:false,
                message:"either name or description is empty"
            })
        }

        // create entry in db 
        const category = await Category.create({
            name:name,
            description:description
        })
        // console.log("Tags : ",category);

        // send response
        return res.status(200).json({
            success:true,
            category,
            message:"Category created Successfully"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in creating Categories"
        })
    }
}

exports.getAllCategories = async(req,res) => {
    try{
        const allCategories = await Category.find({},{name: true, description:true});

        // send response
        return res.status(200).json({
            success:true,
            Categories: allCategories,
            message:"Categories fetched Successfully"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in Finding Categories"
        })
    }
}

// CATEGORY PAGE DETAILS
// select category to find those specific courses
exports.getCourseByCategory = async(req,res) => {
    try{
        // fetch category id
        const {categoryId} = req.body;

        // fetch courses in that category
        const selectedCategory = await Category.findById(categoryId)
                                               .populate("courses")
                                               .exec();

        // validate
        if(!selectedCategory){
            return res.status(404).json({
                success:true,
                message:"Category Not found"
            })
        }

        // when there is no course in this category
        if(selectedCategory.courses.length === 0){
            return res.status(200).json({
                success:true,
                message:"No Course exist in this category"
            })
        }

        // get different category courses
        const differentCategories = await Category.find({_id: {$ne : categoryId}})
                                                   .populate("courses")
                                                   .exec();

        // get top selling courses across all categories
        const topSellingCourses = await Course.find({})
                                        .sort({"studentsEnrolled.length": -1})
                                        .limit(10)
                                        .populate("category")
                                        .exec();


        // return response
        return res.status(200).json({
            success:true,
            message:"Courses fetched Successfully",
            data:{
                Courses: selectedCategory,
                TopSellingCourses: topSellingCourses,
                DifferentCategory: differentCategories,
            }
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in Finding Courses"
        })
    }
}