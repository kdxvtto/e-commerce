const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Admin = require('../models/Admin');
const User = require('../models/User');

const login = async (req,res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email})
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
            else{
                return res.status(401).json({
                    success : false, 
                    message: 'Invalid credentials' 
                });
            }
        } 
        const user = await User.findOne({ email})
        if (user){
            const isMatch = await bcrypt.compare(password, user.password)
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
            } else {
                return res.status(401).json({
                    success : false, 
                    message: 'Invalid credentials'
                 });
            }
        } 
    } catch (error) {
        res.status(500).json({ 
            success : false, 
            message: error.message,
        });
    }
}

module.exports = login