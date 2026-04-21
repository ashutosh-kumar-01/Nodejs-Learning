// import necessary modules and models
const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");  
const bcrypt = require("bcrypt");

// send OTP

exports.sendOTP = async (req, res) => {
  try {

    // fetch email from request body
    const { email } = req.body;

    // check if user already exists
    const checkUserPresent = await User.findOne({ email });

    // if user already exists, then return a respose
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

        const recentOtp = await OTP.findOne({email}).sort({createdAt: -1}).limt(1);
        console.log(recentOtp);

        // validate otp

        if(!recentOtp.length == 0){
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

        const profileDetails = await Profiler.create({
            gender: null,
            dateOfBirth: null,
            about:null,
            contactNumber:Number,

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
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Error occurred while logging in",
        });
    }
}

// change password
