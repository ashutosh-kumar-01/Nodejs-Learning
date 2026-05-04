const mailSender = require('../utils/mailSender');
const { emailVerificationTemplate } = require('../mail/templetes/emailVerificationEmail');

const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
   email: {
        type: String,
        required: true,
    },
   otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 300, // OTP will expire after 5 minutes (300 seconds)
    },
});


// a function -> to send emails 
async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
            email,
            "Verify your email - StudyApp",
            emailVerificationTemplate(otp)
        );
        console.log("Mail sent successfully: ", mailResponse);
    } catch (error) {
        console.log("Error occured while sending mails: ",error);
    }
}

OTPSchema.pre("save", async function(){
    await sendVerificationEmail(this.email, this.otp);
});


module.exports = mongoose.model('OTP', OTPSchema);