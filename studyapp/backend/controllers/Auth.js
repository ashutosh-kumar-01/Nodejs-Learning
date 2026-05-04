// import necessary modules and models
const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");  
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// send OTP

exports.sendOTP = async (req, res) => {
  try {

    // fetch email from request body
    const { email } = req.body || {};

    // check if user already exists
    const checkUserPresent = await User.findOne({ email });

    // if user already exists, then return a respose
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        if (checkUserPresent) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

     // generate a random 6 digit OTP

     var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      console.log("Generated OTP:", otp);

    //   check unique otp or not
    let result = await OTP.findOne({otp: otp});

    while(result){
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
          });
        result = await OTP.findOne({otp: otp});
    }

    // save otp in database
    
    const otpPayload = {email, otp};

    // create an enty in db 
    const otpBody = await OTP.create(otpPayload);
    console.log("OTP saved in database:", otpBody);

    // return response success
        return res.status(200).json({
            success: true,
            message: "OTP sent successfully",
            otp,
        });


  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error occurred while checking user",
    });
  }
};

// signup

exports.signup = async (req, res) => {

    try {
        // data fetch from request body 
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp,
        } = req.body;

        // validate karlo

        if(!firstName || !lastName || !email || !password || !confirmPassword ||  !otp){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // 2 password match karte hai ya nahi

        if(password != confirmPassword){
            return res.status(400).json({
                success: false,
                message: "Password and confirm password value does not match",
            });
        }
        // check user already exists or not
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "User already exists with this email",
            })
        }

        
        // find most recent otp form the user

        const recentOtp = await OTP.findOne({ email }).sort({ createdAt: -1 });
        console.log(recentOtp);

        // validate otp

        if(!recentOtp){
            // otp not found
            return res.status(400).json({
                success: false,
                message: "OTP not found, please generate a new OTP",
            });
        } 
        else if(otp !== recentOtp.otp){
            // invalid otp
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            })
        }


        // hash password

        const hashedPassword = await bcrypt.hash(password, 10);

        // create user in database

        const profileDetails = await Profile.create({
            gender: null,
            dateOfBirth: null,
            about:null,
            contactNumber: contactNumber || null,

        });

        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            contactNumber,
            additionalDetails: profileDetails._id,
            image:`https://api.dicebear.com/6.x/initials/svg?seed=${firstName} ${lastName}`,
        })

        // return response
        return res.status(200).json({
            success: true,
            message: "User created successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while creating user",
        });
    }


}


// login
exports.login = async (req , res ) => {
    try {
        // get data from request body 
        const {email, password} = req.body;
        // validation data 
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required, please try again",
            });
        }
        // user check exist or not 
        const user = await User.findOne({email}).populate("additionalDetails");
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found with this email, please signup first",
            });
        }
        // generate JWT token , after password match 
        if(await bcrypt.compare(password, user.password)){
            const payload = {
                email: user.email,
                id: user._id,
                accountType:user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn: "2h",
            });
            user.token = token;
            user.password = undefined;

            // create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly: true,
            }

            res.cookie("token", token, options).status(200).json({
                success: true,
                message: "User logged in successfully",
            })
            
            }
            else{
                return res.status(401).json({
                    success: false,
                    message:"Invalid credentials, please try again",
                });
    }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while logging in",
        });
    }
}

// change password

exports.changePassword = async (req, res) => {
    try {
        // get data fron request body
        // get  oldpassword, newpassword, and confirmapassword
        // validation of data
        // update password in database after hashing
        // send mail - password changed successfully
        // return response success
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while changing password",
        })
    }
}
