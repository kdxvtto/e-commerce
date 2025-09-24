const Product = require('../models/Product');

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addProduct = async (req,res) => {
    try {
        const {
            name,
            description,
            category,
            quantity,
            price,
            image
        } = req.body;
        const product = new Product({
            name,
            description,
            category,
            quantity,
            price,
            image
        });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const findProduct = await Product.findById(req.params.id);
        if (!findProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, { 
                new: true,
                runValidators: true
            }
        );
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const deleteProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deleteProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(deleteProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    updateProduct,
    deleteProduct
};