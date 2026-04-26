const Section = require('../models/Section');
const Course = require('../models/Course');


exports.createSection = async (req , res)=>{
    try {
        // data fetch
        const {sectionName, courseId} = req.body;
        // data validation
        if(!sectionName || !courseId){
            return res.status(400).json({
                sucess: false,
                message: "All fields are required",
            });
        }
        // create section 
        const newSection = await Section.create({sectionName});
        // update course with section objectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push: {section: newSection._id},
            },
            {new: true},
        );
        // use populate to replace the sections/sub-sections both in the updatedCourseDetails.
        const populatedCourseDetails = await Course.findById(updatedCourseDetails._id)
        .populate({});
        // response
        return res.status(200).json({
            sucess: true,
            message: "Section created successfully",
            updatedCourseDetails,
        });

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error while creating section",
            error: error.message,
        });
    }
}

