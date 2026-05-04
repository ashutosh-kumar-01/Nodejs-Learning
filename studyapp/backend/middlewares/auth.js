const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/User');

// auth
exports.auth = async (req, res, next) => {
    try {
        // extract token
        const authHeader = req.header("Authorization");
        const token = req.cookies.token || req.body.token || (authHeader && authHeader.replace("Bearer ", ""));
        // if  token is missing ,then return response
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Token is missing",
            });
        }

        // verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded token:", decode);
            req.user = decode;

        } catch (error) {
            return res.status(401).json({
                success: false,
                message: "Invalid token",
            });
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        });
    }
}


// isStudent
exports.isStudent = async (req , res, next) => {
    try {
        if(req.user.accountType !== "Student"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for students only",
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}



// isInstructor
exports.isInstructor = async (req , res, next) => {
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for instructors only",
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}



// isAdmin
exports.isAdmin = async (req , res, next) => {
    try {
        if(req.user.accountType !== "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is a protected route for admins only",
            })
        }
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Something went wrong while validating the token",
        })
    }
}