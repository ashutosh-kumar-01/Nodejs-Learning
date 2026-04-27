const SubSection = require("../models/Subsection");
const Section = require("../models/Section");

// create sub-section
exports.createSubSection = async (req, res) => {
  try {
    // fetch data  form request body
    const { sectionId, title, timeDuration, description } = req.body;
    // extract file/video
    const video = req.files.videoFile;
    // validation
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }
    // upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME,
    );
    // create a subsection
    const subSectionDetails = await SubSection.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });
    // update section with this subsection objectId
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },
      { new: true },
    );
    // log updated section here, after adding populate query
    console.log("Updated Section Details: ", updatedSection);
    // response
    return res.status(200).json({
      sucess: true,
      message: "Sub-section created successfully",
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error while creating sub-section",
      error: error.message,
    });
  }
};


// update sub-section
exports.updateSubSection = async (req, res) => {
  try {
    // fetch data  form request body
    const { subSectionId, title, timeDuration, description } = req.body;
    // extract file/video
    const video = req.files.videoFile;
    // validation
    if (!subSectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({
        sucess: false,
        message: "All fields are required",
      });
    }
    // upload video to cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME,
    );
    // update sub-section
    const updatedSubSectionDetails = await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        title: title,
        timeDuration: timeDuration,
        description: description,
        videoUrl: uploadDetails.secure_url,
      },
      { new: true },
    );
    // response

    return res.status(200).json({
      sucess: true,
      message: "Sub-section updated successfully",
      updatedSubSectionDetails,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error while updating sub-section",
      error: error.message,
    });
  }
};

// delete sub-section
exports.deleteSubSection = async (req, res) => {
  try {
    // fetch data  form request body
    const { subSectionId } = req.body;
    // validation
    if (!subSectionId) {
      return res.status(400).json({
        sucess: false,
        message: "Sub-section Id is required",
      });
    }
    // delete sub-section
    const deletedSubSection = await SubSection.findByIdAndDelete(subSectionId);
    // response
    return res.status(200).json({
      sucess: true,
      message: "Sub-section deleted successfully",
      deletedSubSection,
    });
  } catch (error) {
    return res.status(500).json({
      sucess: false,
      message: "Error while deleting sub-section",

      error: error.message,
    });
  }
};
