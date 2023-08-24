const express = require('express');
const { register, loginUser, getAllUsers, getUser, deleteUser, updateUser, unBlockUser, blockUser, refreshToken, logout, makeAdmin, makeUser, updatePassword, forgotPasswordToken, resetPassword, loginAdmin, getWishList, saveAddress, getUserCart, emptyCart, applyCoupon, addToCart, createOrder, getOrders, getOrderByUserId, updateOrderStatus } = require('../controller/userController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/loginUser', loginUser);
router.post('/loginAdmin', loginAdmin);
router.post('/forgotPasswordToken', forgotPasswordToken);
router.post('/resetPassword/:token', resetPassword);
router.post('/updatePassword', authMiddleware, updatePassword)
router.get('/getAllUsers', authMiddleware, isAdmin, getAllUsers);
router.get('/getUser/:id', authMiddleware, isAdmin, getUser);
router.delete('/deleteUser/:id', authMiddleware, deleteUser);
router.put('/updateUser/:id', authMiddleware, isAdmin, updateUser);
router.put('/unBlockUser/:id', authMiddleware, isAdmin, unBlockUser);
router.put('/blockUser/:id', authMiddleware, isAdmin, blockUser);
router.put('/makeAdmin/:id', authMiddleware, isAdmin, makeAdmin);
router.put('/makeUser/:id', authMiddleware, isAdmin, makeUser);
router.get('/refreshToken', refreshToken);
router.get('/logout', logout);
router.get('/getWishList', authMiddleware, getWishList);
router.post('/saveAddress', authMiddleware, saveAddress);
router.post('/addToCart', authMiddleware, addToCart);
router.get('/getUserCart', authMiddleware, getUserCart);
router.post('/emptyCart', authMiddleware, emptyCart);
router.post('/applyCoupon', authMiddleware, applyCoupon);
router.post('/createOrder', authMiddleware, createOrder);
router.get('/getOrders', authMiddleware, isAdmin, getOrders);
router.get('/getOrderByUserId/:id', authMiddleware, getOrderByUserId);
router.post('/updateOrderStatus/:id', authMiddleware, isAdmin, updateOrderStatus);

module.exports = router;