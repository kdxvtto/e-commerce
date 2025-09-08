const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            data : users,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false 
        });
    }
};

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            data : user,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false
         });
    }
};

const addUser = async (req, res) => {
    try {
        const{
            name,
            email,
            password,
            address
        } = req.body;
        const user = new User({
            name,
            email,
            password,
            address
        });
        await user.save();
        res.status(201).json({
            data : user,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false
         });
    }
};

const updateUser = async (req, res) => {
    try {
        const findUser = await User.findById(req.params.id);
        if (!findUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = await User.findByIdAndUpdate(
            req.params.id, 
            req.body, { 
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            data : user,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false
         });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({
            data : user,
            success : true
        });
    } catch (error) {
        res.status(500).json({ 
            message: error.message,
            success : false
         });
    }
};

module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
};