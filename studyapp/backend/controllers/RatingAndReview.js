const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");



// createRating
exports.createRating = async (req , res) => {
    try {
        // get user id
        const userId = req.user.id;
        // fetchdata form user
        const {rating, review, CourseId} = req.body;
        // check if user is enrolled or not
        const courseDetails = await Course.findOne(
            {id:courseId, studentsEnrolled: {$elemMatch: {$eq: userId}}});

        if(!courseDetails){
            return res.status(400).json({
                success: false,
                message:"Student is not enrolled in the course",
            });

        }    
        // check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
            
        })
        // create rating and review
        // update the course with new rating
        // return response
    } catch (error) {
        
    }
}




// getAverageRating






// getAllRating
