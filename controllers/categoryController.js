const Category = require('../models/Category');

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addCategory = async (req, res) => {
    try {
       const { name, description } = req.body;
       const category = new Category({ name, description });
       await category.save();
       res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateCategory = async (req, res) => {
    try {
        const findCategory = await Category.findById(req.params.id);
        if (!findCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        const category = await Category.findByIdAndUpdate(
            req.params.id, 
            req.body, { 
                new: true,
                runValidators: true
            }
        );
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const deleteCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deleteCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(deleteCategory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllCategories,
    getCategoryById,
    addCategory,
    updateCategory,
    deleteCategory
};