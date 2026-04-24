const Course = require('../models/Course');
const Tag = require('../models/Tags');
const User = require('../models/User');

require("dotenv").config();

const {uploadImageToCloudinary} = require('../utils/imageUploader');

// create course handler function
exports.createCourse = async (req , res) => {
    try {
        // fetch data
        const { courseName, courseDescription, whatYouWillLearn, price, tag } = req.body;

        // get thumbnail
        const thumbnail = req.files.thumbnailImage;

        // validation 
        if(!courseName || !courseDescription || !whatYouWillLearn || !price || !tag || !thumbnail){
            return res.status(400).jason({
                sucess: false,
                message: "All fields are required",
            });
        }

        // check for instructor
        const userId = req.user.id;
        const instructorDetails = await User.findById(userId);
        console.log("Instructor Details",instructorDetails);

        if(!instructorDetails){
            return res.status(404).json({
                sucess: false,
                message: "Instructor not found",
            });
        }
        
        // check given tag is valid or not
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({
                sucess: false,
                message: "Tag not found",
            });
        }

        // upload image to cloudinary
        const thumbnailImage = await uploadImageToCloudinary(thumbnail, process.env.FOLDER_NAME);

        // create an enty for new course
        const newCourse  = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price,
            tag: tagDetails._id,
            thumbnail: thumbnailImage.secure_url,
        });

        // add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id: instructorDetails._id},
            {$push: 
                {courses: newCourse._id}
            },
            {new: true},
        );

        // update the TAG schema 
        await Tag.findByIdAndUpdate(
            {_id: tagDetails._id},
            {$push: 
                {courses: newCourse._id}
            },
            {new: true},
        );
        return res.status(200).json({
            sucess: true,
            message: "Course created successfully",
            data: newCourse,
        });
    } catch (error) {
        console.error("Error creating course:", error);
        return res.status(500).json({
            sucess: false,
            message: "Failed to create course",
        }); 
    }
}

// get all courses handler function

exports.getAllCourses = async (req , res) => {
    try {
        const allCourses = await Course.find({}, {courseName: true,
                                                  price: true,
                                                  thumbnail: true,
                                                  instructor: true,
                                                  ratingAndReviews: true,
                                                  studentsEnrolled: true,

        }).populate("instructor").exec();

        return res.status(200).json({
            sucess: true,
            message: "Data for all courses fetched successfully",
            data: allCourses,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            sucess: false,
            message: "Cannot Fetch Courses data",
            error: error.message,
        })
    }
}