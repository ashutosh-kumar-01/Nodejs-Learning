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
                $push: { courseContent: newSection._id },
            },
            { new: true }
        );
        if (!updatedCourseDetails) {
            return res.status(404).json({
                sucess: false,
                message: "Course not found for the provided courseId",
            });
        }
        // use populate to replace the sections/sub-sections both in the updatedCourseDetails.
        const populatedCourseDetails = await Course.findById(updatedCourseDetails._id)
            .populate({});
        // response
        return res.status(200).json({
            sucess: true,
            message: "Section created successfully",
            updatedCourseDetails: populatedCourseDetails,
        });

    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Error while creating section",
            error: error.message,
        });
    }
}


// update section
exports.updateSection = async (req , res) => {
    try {
        // data input
        const {sectionName, sectionId} = req.body;
        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                sucess: false,
                message: "Missing Properties",
            });
        }
        // update section
        const section = await Section.findByIdAndUpdate(
            sectionId,
            {sectionName},
            {new: true}
        );
        // return res
        return res.status(200).json({
            sucess: true,
            message: "Section updated successfully",
            section,
        });
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Unable to update section, please try again",
            error: error.message,
        });
    }
}




// delete section
exports.deleteSection = async (req , res) =>{
    try {
        // get id 
        const {sectionId} = req.body;
        // use findByIdAndDelete to delete the section
        await Section.findByIdAndDelete(sectionId);
        // do we need to remove the section objectId from the course collection as well? 
        // Yes, we need to remove the section objectId from the course collection as well. We can use the $pull operator to remove the section objectId from the course collection.
        // return res
        return res.status(200).json({
            sucess: true,
            message: "Section deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            sucess: false,
            message: "Unable to delete section, please try again",
            error: error.message,
        });
    }
}