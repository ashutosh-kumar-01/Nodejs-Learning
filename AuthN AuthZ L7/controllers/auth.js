const bcrypt = require('bcrypt');
const User = require('../model/User');

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