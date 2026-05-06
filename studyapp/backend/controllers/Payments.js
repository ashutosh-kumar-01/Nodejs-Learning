const { instance } = require("../config/razorpay");
const mongoose = require("mongoose");
const crypto = require("crypto");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

const { courseEnrollmentEmail } = require("../mail/templetes/courseEnrollmentEmail");

// capture the payment and intiate the Razorpay order
exports.capturePayment = async (req , res) => {
    
        // get courseId and UserId
        const {courseId} = req.body;
        const userId = req.user.id;
        // validation

        // valid courseId
        if(!courseId) {
            return res.status(400).json({
                success: false,
                message: "Please provide valid courseId"
            })
        }
        // valid courseDetails
        let course;
        try {
            course = await Course.findById(courseId);
            if(!course) {
                return res.status(404).json({
                    success: false,
                    message: "Course not found"
                });
            }

            // user already pay for the same course
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)) {
                return res.status(400).json({
                    success: false,
                    message: "You have already enrolled for this course"
                });
            }

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
        // order create
        const amount = course.price;
        const currency = "INR";
        const options = {
            amount: amount * 100, // Razorpay works with paise
            currency,
            receipt: Math.random().toString(36).substring(2, 15),// Generate a random receipt ID
            notes:{
                courseId: courseId,
                userId,
            }
        };
        try {
            // initiate the payment useing razorpay
            const paymentResponse = await instance.orders.create(options);
            console.log(paymentResponse);
            // return response 
            return res.status(200).json({
                success: true,
                courseName: course.courseName,
                courseDescription: course.courseDescription,
                amount: paymentResponse.amount,
                orderId: paymentResponse.id,
                currency: paymentResponse.currency,
                thumbnail: course.thumbnail,
            });
        } catch (error) {
            console.log(error);
                return res.status(500).json({
                    success: false,
                    message: "Error in creating Razorpay order"
                });
        }
};

// verify signature of razorpay and server

exports.verifySignature = async (req , res) => {
  
    const webhookSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorised");

        const {courseId, userId} = req.body.payload.payment.entity.notes;

        try {
            // fullfill the action 

            // find the courses and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                { _id: courseId },
                { $push: { studentsEnrolled: userId } },
                { returnDocument: "after" }
            );
            if(!enrolledCourse){
                return res.status(500).json({
                    success: false,
                    message: "Course not found"
                });
            }
            console.log(enrolledCourse);

            // find the student and add the course to their list enrolled courses me
            const enrolledStudent = await User.findOneAndUpdate(
                { _id: userId },
                { $push: { courses: courseId } },
                { returnDocument: "after" }
            );
            console.log(enrolledStudent);

            // email send karo confirmation wala
            const emailResponse = await mailSender(
                enrolledStudent.email,
                "Course Enrollment Confirmation",
                courseEnrollmentEmail(enrolledCourse.courseName, enrolledStudent.firstName || "Student"),
            );
            console.log(emailResponse);
            return res.status(200).json({
                success: true,
                message: "Signature verified and course enrollment successful",
            });
        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success: false,
                message: "Internal Server Error"
            });
        }
    } 
    else{
        return res.status(400).json({
            success: false,
            message: "Invalid signature",
        });
    }
};
 


