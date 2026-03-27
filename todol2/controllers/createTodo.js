// import th model
const Todo = require('../models/Todo');

// define rooute handler
exports.createTodo = async (req, res) => {
    try{
        // extract title and description from request body
        const { title, description } = req.body;

        // create a new todo object and insert in db
        const response = await Todo.create({title, description});
        // send response
        res.status(200).json({
            success: true,
            data: response,
            message: "Todo created successfully"
        });
    }
    catch(err){
        console.error("Error creating todo:", err);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}