const Order = require('../models/Order');
const Product = require('../models/Product');

const getAllOrder = async (req,res) => {
    try {
        const order = await Order.find()
        res.status(200).json({
            data : order,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const getOrderById = async (req,res) => {
    try{
        const order = await Order.findById(req.params.id)
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({
            data : order,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const addOrder = async (req,res) =>{
    try {
        const {
            orderNumber,
            user,
            items,
            status
        } = req.body

        if(!orderNumber || !user || !items || !status) {
            return res.status(400).json({ message: 'Order not valid' });
        }

        let orderItems = []
        let totalAmount = 0
    
        for (const item of items) {
            const product = await Product.findById(item.product)
            if(!product){
                return res.status(404).json({ message: 'Product not found' });
            }
            if(product.quantity < item.quantity) {
                return res.status(400).json({ message: 'Product quantity not enough' });
            }
            product.quantity -= item.quantity
            const subtotal = item.quantity * product.price
            await product.save()
            orderItems.push({
                product : product._id,
                quantity : item.quantity,
                price : product.price,
                subtotal
            })
            totalAmount += subtotal
        }
        const order = new Order({
            orderNumber,
            user,
            items : orderItems,
            totalAmount,
            status
        });
        const newOrder = await order.save();
        res.status(201).json({
            data : newOrder,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const updateOrder = async (req,res) =>{
    try {
        const findOrder = await Order.findById(req.params.id);
        if (!findOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        const order = await Order.findByIdAndUpdate(
            req.params.id, 
            req.body, { 
                new: true,
                runValidators: true
            }
        );
        res.status(200).json({
            data : order,
            success : true
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success : false
        });
    }
}

const deleteOrder = async (req,res) => {
    try {
        const order = await Order.findByIdAndDelete(req.params.id);
        if(!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({
            data : order,
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
    getAllOrder,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
}