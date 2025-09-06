const mongoose = require('mongoose');
const mailSender = require('../utils/mailSender.js');

const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
        trim:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now(),
        expires: 1800
    }
})

// send email using pre middleware
async function sendVerificationEmail(email,otp){
    try{
        const mailResponse = await mailSender(
            email,
            "SkillNova OTP verification",
            `Here is your One Time Password(OTP) - ${otp}. valid for next 5 minutes.` 
        );

        // console.log("Email Sent : ",mailResponse);

    }catch(err){
        console.log("Error occur while sending mail ",err);
        throw err;
    }
}

otpSchema.pre('save',async function(next){
    await sendVerificationEmail(this.email,this.otp);
    next();
})

module.exports = mongoose.model("OTP",otpSchema)