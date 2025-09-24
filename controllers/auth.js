const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const User = require('../models/User');

const register = async (req,res) => {
    try {
        const { name, email, password, address, role } = req.body;
        if(!name || !email || !password || !address){
            return res.status(400).json({
                success : false,
                message: 'All fields are required'
            });
        }
        if(role === 'admin'){
            const adminExists = await Admin.findOne({ email });
            if(adminExists){
                return res.status(400).json({
                    success : false,
                    message: 'Admin already exists'
                });
            }
            const admin = new Admin({
                name,
                email,
                password,
                address
            });
            const savedAdmin = await admin.save();
            res.status(201).json({
                data : savedAdmin,
                success : true
            });
        }
        if(role === 'user'){
            const userExists = await User.findOne({ email });
            if(userExists){
                return res.status(400).json({
                    success : false,
                    message: 'User already exists'
                });
            }
            if(password.length < 6){
                return res.status(400).json({
                    success : false,
                    message: 'Password must be at least 6 characters'
                });
            }
            const user = new User({
                name,
                email,
                password,
                address
            });
            const savedUser = await user.save();
            res.status(201).json({
                data : savedUser,
                success : true
            });
        }
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}
const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email }).select('+password')
        if (admin){
            const isMatch = await bcrypt.compare(password, admin.password)
            if(isMatch){
                const token = jsonwebtoken.sign({ 
                    id: admin._id, role: 'admin' 
                    }, 
                    process.env.JWT_SECRET, 
                    { 
                        expiresIn: '1h', 
                    });
                    return res.status(200).json({ 
                        success : true,
                        message: 'Login successful', 
                        token 
                });
            }
            console.log('admin password match :' + isMatch)
        } 
        const user = await User.findOne({ email}).select('+password')
        console.log('user found')
        if (user){
            const isMatch = await bcrypt.compare(password, user.password)
            console.log('user password match :' + isMatch)
            if(isMatch){
                const token = jsonwebtoken.sign({ 
                    id: user._id, role: 'user' 
                    }, 
                    process.env.JWT_SECRET, 
                    { 
                        expiresIn: '1h', 
                    });
                    return res.status(200).json({ 
                        success : true,
                        message: 'Login successful', 
                        token 
                });
            }
        }
        return res.status(400).json({
            success : false,
            message: 'Invalid credentials'
        }) 
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message: error.message,
        });
    }
}

const logout = async (req,res) => {
    try {
        res.status(200).json({ 
            success : true,
            message: 'Logout successful' 
        });
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message: error.message,
        });
    }
}

const userProfile = async (req,res) => {
    try {
        res.status(200).json({ 
            success : true,
            message: 'User profile' 
        });
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message: error.message,
        });
    }
}

module.exports = {
    register,
    login,
    logout,
    userProfile
}