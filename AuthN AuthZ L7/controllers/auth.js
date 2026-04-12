const bcrypt = require('bcrypt');
const User = require('../model/User');
const jwt = require('jsonwebtoken');

require('dotenv').config();

// signup route handler
exports.signup = async (req , res) => {
    try {
        // get data 
        const {name, email, password, role} = req.body;

        //check if user already exists
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: 'User already exists'});
        }

        // secure password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        }
        catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Error hashing password',
            })
        }

        // create entry for user 
        const user = await User.create({
            name, email , password: hashedPassword, role
        })
        
        return res.status(200).json({
            success: true,
            message: 'User created successfully',
        });
    } catch (error) {
        console.error('Error in signup:', error);
        return res.status(500).json({
            success: false,
            message: ' User cannot be registered ',
        });
    }
} 



// login route handler
exports.login = async (req, res) => {
    try {
        // data fetch
        const {email, password} = req.body;
        // validation on email and password
        if(!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }
        // check for user registration
        let user = await User.findOne({email});
        // if not a registered user
        if(!user){
            return res.status(401).json({
                success: false,
                message: 'User is not registered',
            });
        }
        // make a payload for token
        const payload = {
            email: user.email,
            role: user.role,
            id: user._id,
        };
        // verifiy password and generate jwt token
        if(await bcrypt.compare(password, user.password)){
            // password match
            // generate token
            let token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '2h'});
            // user.token = token;
            user = user.toObject();
            user.token = token;
            // iss se ya ho ga ki password ko response me nahi bhejna hai
            user.password = undefined;
            console.log(user);
            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
                httpOnly: true,
            }
            // cookies me token bhejna hai
            res.cookie('token', token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfully",
            });
        }
        else{
            // password does not match
            return res.status(403).json({
                success: false,
                message: 'Invalid credentials',
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Error logging in',
        });
    }
}