const express = require('express');
const { register, loginUser, getAllUsers, getUser, deleteUser, updateUser, unBlockUser, blockUser, refreshToken, logout, makeAdmin, makeUser, updatePassword, forgotPasswordToken, resetPassword, loginAdmin } = require('../controller/userController');
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

module.exports = router;