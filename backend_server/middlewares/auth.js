const User = require('../models/User.js');
require('dotenv').config();
const jwt = require('jsonwebtoken');

// auth
exports.auth = async(req,res,next) => {
    try{
        // fetch token 
        // console.log("Request Body : ",req.body);
        // console.log("YES Yes Yes Yes")
        const token = req.cookies.token || req.body.token || req.header("Authorization").replace("Bearer ","");

        // validate token
         //console.log("Token : ",token);
        if(!token){
            return res.status(401).json(
                {
                    success:false,
                    message:"Token Missing"
                }
            )
        }

        // verify and get data from token
        try{
            const payload = jwt.verify(token,process.env.JWT_SECRET);

            // send payload data to next middleware inside request
            
            req.user = payload;
            

        }catch(err){
            return res.status(401).json(
                {
                    success:false,
                    message:"Token is Invalid"
                }
            )
        }

        // next middleware
        // console.log("Req : ",req.user);
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Something went Wrong"
        })
    }
}

// isStudent
exports.isStudent = async(req,res,next) => {
    try{
       
        if(req.user.accountType !== "Student"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Student only"
            })
        }

        // next middleware
        // console.log("Req : ",req.user);
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"User accountType not verified"
        })
    }
}

// isInstructor
exports.isInstructor = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Instructor"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Instructor only"
            })
        }

        // next middleware
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"User accountType not verified"
        })
    }
}

// isAdmin
exports.isAdmin = async(req,res,next) => {
    try{
        if(req.user.accountType !== "Admin"){
            return res.status(400).json({
                success:false,
                message:"This is a protected route for Admin only"
            })
        }

        // next middleware
        next();

    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"This is a protected Route"
        })
    }
}
