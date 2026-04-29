const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/MailSender");

const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");

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
    
};
 
// ..............