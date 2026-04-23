const User = require('../models/User');
const mailSender = require('../utils/mailSender');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

// resetPassword token
exports.resetPasswordToken = async (req , res) => {
    try {
        // get email from request body
        const { email } = req.body;
        // check if email is provided
        const user = await User.findOne({ email: email });
        if(!user){
            return res.status(400).json({
                sucess: false,
                message: "Your email is not registered with us"
            });
        }
        // generate token
        const token = crypto.randomUUID();
        // update user by adding token and expiration time
        user.updatedDetails = await User.findOneAndUpdate(
            { email: email },
            { resetPasswordToken: token, resetPasswordExpires: Date.now() + 30000}, // 5 minutes
            { new: true }
        );
        // create url 
        const url = `http://localhost:3000/update-password/${token}`
        //send mail containing the url 
        await mailSender(email,
            "Password Reset Link", 
            `Click on the link to reset your password ${url}`);
        // return response 
        return res.status(200).json({
            success: true,
            message: "Reset password link has been sent to your email"
        });

    } catch (error) {
        console.error("Error occurred while generating reset password token:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to generate reset password token"
        });
    }
}

// resetPassword

exports.resetPassword = async (req , res) => {
    try {
        // data fetch 
        const {  password, confirmPassword, token } = req.body;
        // validation 
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message:" Password and confirm password do not match"
            });
        }
        // get userdetails from db using token
        const userDetails = await User.findOne({token: token});
        // if no entry - invalid token
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "Token is invalid",
            });
        }
        // token time check
        if(userDetails.resetPasswordExpires < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Token has expired",
            });
        }
        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        // password update

        await User.findOneAndUpdate(
            { token: token },
            { password: hashedPassword },
            { new: true }
        );
        // response
        return res.status(200).json({
            success: true,
            message: "Password has been reset successfully"
        });

    } catch (error) {
        console.error("Error occurred while generating reset password token:", error);
        return res.status(500).json({
            success: false,
            message:" Failed to reset password"
        });
    }
}