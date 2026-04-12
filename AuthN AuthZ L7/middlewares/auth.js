// auth , isStudent, isAdmin middleware
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    // extract jwt token
    // pending : other ways to extract token like from header and cookie
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    // verify token
    try {
      const playload = jwt.verify(token, process.env.JWT_SECRET);
      console.log(playload);
      req.user = playload;
      // next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
        next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in authentication",
    });
  }
}

exports.isStudent = (req, res, next) => {
    try {
        if(req.user.role !== 'student'){
            return res.status(403).json({
                success: false,
                message: 'Access denied. Students only.',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "User role is not matching",
        })
    }
}

exports.isAdmin = (req, res, next) => {
    try {
        if(req.user.role !== 'admin'){
            return res.status(403).json({
                success: false,
                message: 'This is a protected route for admin ',
            });
        }
        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error in admin authentication",
        })
    }
}
