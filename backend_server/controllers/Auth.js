const OTP = require('../models/OTP.js');
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Profile = require('../models/Profile.js');
const mailSender = require('../utils/mailSender.js');
require('dotenv').config();

const otpGenerator = require('otp-generator')

// send OTP - here we generate otp and send it to pre middleware because at that time this.otp in schema gives this recently generated otp
exports.sendOTP = async(req,res) => {
    try{
        // get email from request body
        let {email} = req.body;

        // check user already exist in DB - using findOne email
        const userExist = await User.findOne({email:email});

        // if user exist
        if(userExist){
            return res.status(409).json(
                {
                    success:false,
                    message:"User already exists"
                }
            )
        }

        // if user not exist 
        // generate OTP
        let Otp = otpGenerator.generate(6, { 
                upperCaseAlphabets: false,
                lowerCaseAlphabets:false ,
                specialChars: false 
        });

        // check OTP is unique or not in DB
        let otpExist = await OTP.findOne({otp:Otp});

        // jab tak otpExist krta rhega tab tak new otp generate krte rho
        while(otpExist){
            Otp = otpGenerator.generate(6, { 
                upperCaseAlphabets: false,
                lowerCaseAlphabets:false ,
                specialChars: false 
            });
            otpExist = await OTP.findOne({otp:Otp});
        }

        // when otp is found unique
        // create its Entry to DB
        const otpSaved = await OTP.create({
            email: email,
            otp:Otp
        });
        
        // console.log("OTP body : ",otpSaved);

        // return Response
        res.status(200).json({
            success:true,
            message:"OTP sent Successfully",
            OTP:otpSaved
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in sending OTP",
            error:err.message
        })
    }
} 

// signup Handler
exports.signup = async(req,res) => {
    try{
        // get user data from request body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            countryCode,
            contactNo,
            otp
        }  =  req.body;

        // check data send by user or empty - validate
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(400).json({
                success:false,
                message:"Fill the required details"
            })
        }else if(password !== confirmPassword){ // compare password and confirmPassword
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password must be same"
            })
        }
        
        // check if user already exist
        const userExist = await User.findOne({email});

        if(userExist){
            return res.status(409).json({
                success:false,
                message:"User already exists"
            })
        }

        // if not exist already
        // fetch most recent OTP for the user from DB
        const recentOTP = await OTP.findOne({email}).sort({createdAt: -1}).limit(1);
        // console.log("Recent OTP : ",recentOTP);
    
        // validate OTP - filled input OTP and DB fetched OTP
        if(!recentOTP || recentOTP.otp !== otp){
            return res.status(400).json({
                success:false,
                message:"OTP not found or Mismatched"
            })
        }

        // if otp is matched
        // hash Password using bcrypt
        const hashedPassword = await bcrypt.hash(password,10);

        // create User entry in DB
        // also create entry for Profile model during signup
        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            countryCode:countryCode,
            contactNo: contactNo
        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            additionalDetails:profileDetails._id,
            image:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`  // using third party link to gnerate img
        });

        // send response
        res.status(200).json({
            success:true,
            message:"User Created Successfully",
            user
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"user SignUp failed",
            error:err.message
        })
    }
}

// login
exports.login = async(req,res) => {
    try{
        // fetch data from req body
        const {email,password} = req.body;

        // validate
        if(!email || !password){
            return res.staus(400).json({
                success:false,
                message:"Fill the required details"
            })
        }

        // check user exist or not
        let user = await User.findOne({email}).populate("additionalDetails").exec();

        if(!user){
            return res.status(409).json({
                success:false,
                message:"User not registered"
            })
        }

        // if user exists - compare passwords
        const comparePassword = await bcrypt.compare(password,user.password);
        if(!comparePassword){
            return res.status(409).json({
                success:false,
                message:"Wrong Password"
            })
        }

        // if passwords matched
        // create payload and send it to jsonwebtoken
        const payload = {
            email: user.email,
            id:user._id,
            accountType:user.accountType
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET ,{expiresIn : "24h"});

        // insert token inside user object send to cookie and remove password from it
        user = user.toObject();
        user.token = token;
        user.password = undefined;

        // create options and send response in cookie
        const options = {
            httpOnly:true,
            secure:true,
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000 // milli seconds
        }
        res.cookie("token",token,options).status(200).json({
            success:true,
            message:"User Logged in Successfully",
            token,
            user
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"user Login failed,try Again",
            error:err.message
        })
    }
}

// changePassword
exports.changePassword = async(req,res) => {
    try{
        // fetch user data from authenticated request
        const userId = req.user.id;

        // fetch new changed password from request body
        const {email,oldPassword,newPassword,confirmNewPassword} = req.body;

        // validation
        if(!oldPassword || !newPassword || !confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"fill the required Fields"
            })
        }

        // compare newPassword And confirmNewPassword must same
        if(newPassword !== confirmNewPassword){
            return res.status(400).json({
                success:false,
                message:"Password and Confirm Password must be same"
            })
        }
        // find user with OLD password
        const user = await User.findOne(userId);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"user not found"
            })
        }

        // compare oldPassword is correct or not in DB
        const comparePassword = await bcrypt.compare(oldPassword,user.password);
        if(!comparePassword){
            return res.status(400).json({
                success:false,
                message:"Old Password is Incorrect"
            })
        }

        // hash new password
        const hashNewPassword = await bcrypt.hash(newPassword,10);

        // update password and save
        user.password = hashNewPassword;
        await user.save();

        // send mail to user
        await mailSender(user.email,"SkillNova - Changed password Confirmation", "Your password for SkillNova is Changed Successfully");

        // send response
        res.status(200).json({
            success:true,
            message:"Password updated Successfully"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Password updation fail, try again"
        })
    }
}


// get enrolled courses


// get course progress