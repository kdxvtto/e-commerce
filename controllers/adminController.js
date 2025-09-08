const Admin = require('../models/Admin');

const getAllAdmins = async (req,res) =>{
    try {
        const admin = await Admin.find();
        res.status(200).json({
            data : admin,
            success : true
        });
    } catch (error) {
        res.status(500).json({
             message: error.message,
             success : false
            });
    }
}

const getAdminById = async (req,res) => {
    try {
        const admin = await Admin.findById(req.params.id)
        if(!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({
            data : admin,
            success : true
        });
        } catch (error) {
            res.status(500).json({
                message: error.message,
                success : false 
            });
    }
}

const addAdmin = async (req,res) =>{
    try {
        const {
            name,
            email,
            password
        } = req.body;
        const admin = new Admin({
            name,
            email,
            password
        });
        const newAdmin = await admin.save();
        res.status(201).json({
            data : newAdmin,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const updateAdmin = async (req,res) =>{
    try {
        const findAdmin = await Admin.findById(req.params.id);
        if (!findAdmin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        const admin = await Admin.findByIdAndUpdate(
            req.params.id, 
            req.body, { 
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            data : admin,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const deleteAdmin =  async (req,res) => {
    try {
        const admin = await Admin.findByIdAndDelete(req.params.id);
        if(!admin) {
            return res.status(404).json({ message: 'Admin not found' });
        }
        res.status(200).json({
            data : admin,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

module.exports = {
    getAllAdmins,
    getAdminById,
    addAdmin,
    updateAdmin,
    deleteAdmin
}