const Profile = require('../models/Profile');
const User = require('../models/User');

exports.updateProfile = async (req, res) => {
    try {

        // get data
        const {dateOfBirth="", about="", contactNumber, gender} = req.body;

        // get userId
        const id = req.user.id;

        // validation
        if(!contactNumber || !gender || !id){
            return res.status(400).json({
                success: false,
                message: "Missing required fields",
            });
        }


        // find profile
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;
        const profileDetails = await Profile.findById(profileId);


        // update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.contactNumber = contactNumber;
        profileDetails.gender = gender;
        await profileDetails.save();
        // return response

        return res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            profileDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while updating profile",
            error: error.message,
        });
    }
}

// deleteAccount
exports.deleteAccount = async (req, res) => {
    try {

        // get id
        const id = req.user.id;
        // validation
        const userDetails = await User.findById(id);
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }

        // delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        // unenroll user form all enrolled courses
        await Course.updateMany(
            { enrolledStudents: id },
            { $pull: { enrolledStudents: id } }
        );

        // delete user
        await User.findByIdAndDelete({_id: id});

        // return response
        return res.status(200).json({
            success: true,
            message: "Account deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while deleting account",
            error: error.message,
        });
    }
}


// get profile details
exports.getAllUserDetails = async (req , res) => {
    try {
        // get id 
        const id = req.user.id;

        // validation and get user details
        const userDetails = await User.findById(id).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(400).json({
                success: false,
                message: "User not found",
            });
        }
        // return response
        return res.status(200).json({
            success: true,
            message: "User details fetched successfully",
            userDetails,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error while fetching user details",
            error: error.message,
        });
    }
}