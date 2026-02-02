const User = require('../models/User.js');
const mailSender = require('../utils/mailSender.js');
const crypto = require('crypto');
const bcrypt = require('bcrypt');

// resetPasswordToken
exports.resetPasswordToken = async(req,res) => {
    try{
        // get email from request body
        const email = req.body.email;

        // email validation
        if(!email){
            return res.status(400).json({
                success:false,
                message:"Email not found"
            })
        }

        // check user exist with email or not
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User with the email not registered"
            })
        }

        // if exist
        // generate token -: here token is for generate different links with same url format
        const token = crypto.randomUUID();

        // make sure that link with specific token expires in specific time
        // update user with adding token and expiration time
        user.token = token;
        user.resetPassExpires = Date.now() + 10*60*1000 ;
        await user.save();

        // create resetUrl -: this link loads frontend UI i.e PORT of Frontend required
        const resetUrl = `http://localhost:3000/update-password/${token}`

        // send mail with resetUrl in it
        await mailSender(email,
            "SkillNova - Reset Password", 
            `<h2>Hello ${user.firstName}</h2><p>Follow this link to get Reset Your Password on SkillNova Website</p><p>Link : ${resetUrl}</p>`
        );

        // return response
        return res.status(200).json({
            success:true,
            message:"Reset Password token generated"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Password reset Link not generated,try again"
        })
    }
}

// resetPassword
exports.resetPassword = async(req,res) => {
    try{
        // fetch newPassword, confirmNewPassword from req
        const {password,confirmPassword ,token} = req.body; // frontend gives this token in body

        // validate data
        if(!password || !confirmPassword){
            return res.status(400).json({
                success:false,
                message:"fill the required fields"
            })
        }
        if(password !== confirmPassword){
            return res.status(400).json({
                success:false,
                message:"New Password and Confirm password must same"
            })
        }

        // get userDetails from DB using token
        const user = await User.findOne({token: token});

        // check user exist or not
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        // check expired time for token
        if(user.resetPassExpires < Date.now()){
            return res.status(404).json({
                success:false,
                message:"Reset Password Token timeout"
            })
        }

        // if token found valid
        // hash password 
        const hashedPassword = await bcrypt.hash(password,10);

        // update user password in DB 
        user.password = hashedPassword;
        await user.save();

        // return res response
        return res.status(200).json({
            success:true,
            message:"Password reset Successful"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Something went wrong, try again"
        })
    }
}