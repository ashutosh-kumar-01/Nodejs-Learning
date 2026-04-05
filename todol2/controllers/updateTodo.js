// import th model
const Todo = require('../models/Todo');

// define rooute handler
exports.updateTodo = async (req, res) => {
    try{
        const { id } = req.params;
        const { title, description } = req.body;
        // find the todo item by id and update it
        const todo = await Todo.findByIdAndUpdate(
            {_id: id},
            { title, description, updatedAt: Date.now()},
        )
        res.status(200).json({
            success: true,
            data: todo,
            message: `Todo ${id} is updated successfully`
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