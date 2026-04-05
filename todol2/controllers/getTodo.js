// import th model
const Todo = require('../models/Todo');

// define rooute handler
exports.getTodo = async (req, res) => {
    try{
        // fetch all todo iteams from database
        const todos = await Todo.find({});

        // send response
        res.status(200).json({
            success: true,
            data: todos,
            message:"Entire Todo Data is Fetched successfully",
        });
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            error: err.message || "Internal Server Error",
            message: "Failed to fetch todo data"
        });
    }
}



// get todo by id
exports.getTodoById = async (req, res) =>{
    try {
        // etract todo items basis on id
        const id = req.params.id;
        const todo = await Todo.findById({_id: id});;

        // data forgiven id not found
        if(!todo){
            return res.status(404).json({
                success: false,
                message: "Todo item not found with the provided id"
            });
        }
        // data for given id found
        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo ${id} data is fetched successfully`
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: error.message || "Internal Server Error",
            message: "Failed to fetch todo data"
        });
    }
}