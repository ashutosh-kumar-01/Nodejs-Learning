const File = require('../models/file');

// localfileupload ka handler function create karna hai 
exports.localFileUpload = async (req, res) => {
    try {
       
        // fetch file
        const file = req.files.file;
        console.log("lo jii file aagaya ",file);

        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("lo jii path bhi aagaya ",path);

        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: "local file uploaded successfully",
        });
    } catch (error) {
        console.log(error);
    }
}