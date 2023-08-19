const express = require('express');
const { createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, disLikeBlog } = require('../controller/blogController');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/createBlog', authMiddleware, isAdmin, createBlog);
router.post('/likeBlog', authMiddleware, likeBlog);
router.post('/disLikeBlog', authMiddleware, disLikeBlog);
router.post('/updateBlog/:id', authMiddleware, isAdmin, updateBlog);
router.get('/getBlog/:id', getBlog);
router.get('/getAllBlogs', getAllBlogs);
router.get('/deleteBlog/:id', authMiddleware, isAdmin, deleteBlog);

module.exports = router;