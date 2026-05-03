const Tag = require('../models/Tags');

// create tag ka handler function 

exports.createCategory = async (req , res) => {
    try {
        // DATA FETCH
        const { name, description } = req.body;
        // validation
        if(!name || !description){
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }
        // create entry in database
        const tagDetails = await Tag.create({
            name: name,
            description: description,
        });
        console.log(tagDetails);
        // return response
        return res.status(200).json({
            success: true,
            message: "Tag created successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "failed to create tag"
        })
    }
};


// get all categories handler function 

exports.showAllCategories = async (req , res) => {
    try {
        const allTags = await Tag.find({},{name:true, description:true});
        return res.status(200).json({
            success: true,
            message: "All tags return successfully",
            allTags: allTags,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tags"
        });
    }
};

// category page details handler function 

exports.categoryPageDetails = async (req, res) =>{
    try {
        const {categoryId} = req.body;

        // get courses for the specified category
        const selectedCategory = await Tag.findById(categoryId).populate("courses").exec();
        console.log(selectedCategory);

        // handle the case when the category is not found
        if(!selectedCategory){
            console.log("Category not found");
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        // handle the case when there are no courses
        if(selectedCategory.courses.length === 0){
            console.log("No course found for the selected category.");
            return res.status(404).json({
                success: false,
                message: "No course found for the selected category.",
            });
        }

        const  selectedCourses = selectedCategory.courses;

        // get courses for other categories
        const categoriesExceptSelected = await categoryId.find({
            _id: { $ne: categoryId }, 
        }).populate("courses");

        let differentCourses = [];
        for(const category of categoriesExceptSelected){
            differentCourses.push(...category.courses);
        }

        // get top-selling courses across all categories
        const allCategories = await Category.find().populate("courses");
        const allCourses = allCategories.flatMap(category => category.courses);
        const mostSellingCourses = allCourses.sort((a, b) => b.sold - a.sold).slice(0, 10);

        // return response
        return res.status(200).json({
            success: true,
            message: "Category page details fetched successfully",  
            selectedCourses: selectedCourses,
            differentCourses: differentCourses,
            mostSellingCourses: mostSellingCourses,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch category page details"
        });
    }
};