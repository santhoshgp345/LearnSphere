const Course = require('../models/Course.js');
const User = require('../models/User.js');
const instance = require('../config/razorpay.js');
const mailSender = require('../utils/mailSender.js');
const mongoose = require('mongoose');
const crypto = require("crypto");
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")

// Payment creation
// capture the payment and initiate razorpay order
exports.capturePayment = async(req ,res) => {
    try{
        // fetch courseID and userID from req
        const { courses, userDetails } = req.body;
        const userId = userDetails._id;

    // console.log("User ID : ",userId)
    if(!courses || courses.length === 0){
      return res.status(400).json({ success: false, message: "Please Provide Course ID" });
    }

    let total_amount = 0;

    for (const courseObj of courses) {
        let course;
        try {
          // Ensure we're extracting the actual courseId
          const course_id = courseObj  // Adjust for possible structures
          // console.log(course_id)
          if (!mongoose.Types.ObjectId.isValid(course_id)) {
            return res.status(400).json({ success: false, message: `Invalid Course ID: ${course_id}` });
          }
  
          // Find the course by its ID
          course = await Course.findById(course_id);
          // console.log("course Details :",course)
          if (!course) {
            return res.status(404).json({ success: false, message: "Could not find the Course" });
          }
  
          // Check if the user is already enrolled
          const uid = new mongoose.Types.ObjectId(userId);
  
          if (course.studentsEnrolled.includes(uid)) {
            return res.status(400).json({ success: false, message: "Student is already Enrolled" });
          }
          
          await User.findByIdAndUpdate(
            userId,
            { $push: { courses: course_id } },
            { new: true }
          );
          
  
          total_amount += course.price;
          // console.log("Total amount : ",total_amount)
        } catch (error) {
          console.error("Error finding course:", error);
          return res.status(500).json({ success: false, message: error.message });
        }
      }

        // if not paid
        // create request Parameers
        // const amount = course.price;
        const currency = "INR";

        const options = {
            amount: total_amount * 100,
            currency,
            receipt: Math.random(Date.now()).toString(),
            // note:{
            //     courses:courses,
            //     userId:userId
            // }
        }

        // console.log("Options : ",options)

        // pass req params
        try{
            // initiate the payment with razorpay
            // console.log("Creating payment order with options:", options);
            const paymentResponse = await instance.orders.create(options);
            // console.log("Payment Response : ",JSON.stringify(paymentResponse, null, 2));

            // return response
            return res.status(200).json({
                success:true,
                order_id:paymentResponse.id,
                amount: total_amount * 100,
                currency:currency,
                message:"Payment order Created Successfully"
            })

        }catch(err){
            console.log("Razorpay Error:", err);
            return res.status(500).json({
                success: false,
                message: "Order creation failed, try again",
                error: err.message // This will help debug
            });
        }

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Payment Failed"
        })
    }
}

// Payment Authorization
// verification of Signature
exports.verifySignature = async(req ,res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses, userDetails } = req.body;
        const userId = userDetails._id;

        // console.log("Data request : ",razorpay_order_id, razorpay_payment_id, razorpay_signature, courses, userId );
        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
          return res.status(400).json({ success: false, message: "Payment Failed" });
        }
    
        let body = razorpay_order_id + "|" + razorpay_payment_id;

        // console.log("Body : ",body)

        const expectedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAY_SECRET)
          .update(body.toString())
          .digest("hex");

        // console.log("Expected Signature : ",expectedSignature)
        if (expectedSignature !== razorpay_signature) {
          return res.status(400).json({ success: false, message: "Payment Failed" });
        }
    

        try {
            // console.log(courses, userId);
            
            for (const course of courses) {
              // Ensure courseId is extracted correctly
              const courseId = typeof course === 'object' ? course.courseId : course;
        
              // Validate courseId before querying
              if (!mongoose.Types.ObjectId.isValid(courseId)) {
                console.error(`Invalid course ID: ${courseId}`);
                continue; // Skip invalid course IDs
              }
        
              const courseDoc = await Course.findById(courseId);
              if (!courseDoc) {
                console.error(`Course with ID ${courseId} not found`);
                continue;
              }
        
              // Convert userId to ObjectId
              const uid = new mongoose.Types.ObjectId(userId);
        
              // Check if user is already enrolled
              if (!courseDoc.studentsEnrolled.includes(uid)) {
                courseDoc.studentsEnrolled.push(uid);
                await courseDoc.save();
              }
            }

            const user = await User.findById(userId);
            
            await mailSender(
                user.email,
                "Congratulations on Enrollment in SkillNova Courses",
                `<div className="flex flex-col items-center">
                <h2 className="text-xl bg-yellow-400 font-semibold">Congratulations ${user.firstName} ${user.lastName}</h2>
                <p>You have enrolled into ${courses.length} courses</p>
                <p className="text-lg font-semibold">Best Regards</p>
                </div>`
            )

            return res.status(200).json({ 
                success: true, 
                message: "Payment Verified,You Enrolled into Course"
            });

          } catch (error) {
            console.error("Error enrolling students:", error);
          }
    
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Error in verifying payment, try again"
        })
    }
}

// send success message through email
exports.sendPaymentSuccessEmail = async (req, res) => {
    const { orderId, paymentId, amount } = req.body
    // console.log(req.body);
    const userId = req.body.userDetails._id;
  
    if (!orderId || !paymentId || !amount || !userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide all the details" })
    }
  
    try {
      const enrolledStudent = await User.findById(userId)
  
      await mailSender(
        enrolledStudent.email,
        `Payment Received`,
        paymentSuccessEmail(
          `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
          amount / 100,
          orderId,
          paymentId
        )
      )
    } catch (error) {
      console.log("error in sending mail", error)
      return res
        .status(400)
        .json({ success: false, message: "Could not send email" })
    }
  }
  