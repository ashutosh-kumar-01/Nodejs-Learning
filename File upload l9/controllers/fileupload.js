const File = require('../models/file');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// localfileupload ka handler function create karna hai 
exports.localFileUpload = async (req, res) => {
    try {
       
        // fetch file
        const file = req.files.file;
        console.log("lo jii file aagaya ",file);

        // create path where file neeed to  store on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
        console.log("lo jii path bhi aagaya ",path);


        // add path to move function
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

// check file type supported hai ya nahi
function isFileTypeSupported(type, supportedTypes) {
    return supportedTypes.includes(type);
}


// cloudinary file upload ka handler define yaha karna hai
async function uploadFileToCloudinary(file, folder, quality) {
    const options = {folder};
    if(quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

// image upload ka handler define yaha karna hai 
exports.imageUpload = async (req, res) =>{
    try {
        // data fetch karna hai
        const { name, tags, email } = req.body;
        console.log(name, tags, email);

        // file fetch karna hai 
        const file = req.files.imageFile;
        console.log(file);

        // validation check karna hai
        const supportedTypes = ["jpg","jpeg","png"];
        const fileType = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(fileType, supportedTypes)){
            return res.status(400).json({
                success: false,
                message: "File type not supported"
            });
        }

        // file format supported hai 
        const response = await uploadFileToCloudinary(file, "codehelp");
        console.log(response);

        // db ke aandar entry save karni hia 
        const fileData = await File.create({
            name,
            imageUrl: response.secure_url,
            tags,
            email
        })

        res.json({
            success: true,
            imageUrl: response.secure_url,
            message: "Image uploaded successfully",
        });

    } catch (error) {
        console.error("DEBUG ERROR: ", error);
        res.status(400).json({
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}