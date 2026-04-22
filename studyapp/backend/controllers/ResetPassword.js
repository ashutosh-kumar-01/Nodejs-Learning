const User = require('../models/User');
const mailSender = require('../utils/mailSender');

// resetPassword token
exports.resetPasswordToken = async (req , res) => {
    try {
        // get email from request body
        // check if email is provided
        // generate token
        // update user by adding token and expiration time
        // create url 
        //send mail containing the url 
        // return response


        const url = `http://localhost:3000/update-password/${token}`
    } catch (error) {
        
    }
}

// resetPassword