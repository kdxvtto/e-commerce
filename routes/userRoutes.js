const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const checkRole = require('../middleware/checkRole');
const userValidation = require('../middleware/userValidation');
const {
    getAllUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser
} = require('../controllers/userController');

router.get('/', verifyToken, checkRole('admin'), getAllUsers);
router.get('/:id', verifyToken, checkRole('admin'), getUserById);
router.post('/', verifyToken, checkRole('admin'), userValidation.addUserValidation, addUser);
router.put('/:id', verifyToken, checkRole('admin'), userValidation.updateUserValidation, updateUser);
router.delete('/:id', verifyToken, checkRole('admin'), deleteUser);

module.exports = router;