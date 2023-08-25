const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createColor, getColor, getAllColor, deleteColor, updateColor } = require('../controller/colorController');

const router = express.Router();

router.post('/createColor', authMiddleware, isAdmin, createColor);
router.post('/updateColor/:id', authMiddleware, isAdmin, updateColor);
router.post('/deleteColor/:id', authMiddleware, isAdmin, deleteColor);
router.get('/getColor/:id', authMiddleware, isAdmin, getColor);
router.get('/getAllColor', authMiddleware, isAdmin, getAllColor);


module.exports = router;