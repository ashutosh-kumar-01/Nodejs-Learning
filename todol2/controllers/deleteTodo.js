// import th model
const Todo = require('../models/Todo');


// define rooute handler
exports.deleteTodo = async (req, res) => {
    try{
        const { id } = req.params;

        await Todo.findByIdAndDelete({_id: id});

        res.status(200).json({
            success: true,
            message: `Todo ${id} is deleted successfully`
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