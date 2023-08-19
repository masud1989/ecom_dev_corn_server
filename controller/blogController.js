const Blog = require('../model/blogModel');
const User = require('../model/userModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDBId');

const createBlog = asyncHandler( async (req, res) => {
    try {
        const postBody = req.body
        const newBlog = await Blog.create(postBody);
        res.json({
            status: 'success',message: 'New Blog Created Successfully ', data: newBlog
        })
    } catch (error) {
        throw new Error(error);
    }
});

const updateBlog = asyncHandler( async (req, res) => {
    const id = req.params.id
    validateMongoDbId(id)
    const postBody = req.body
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(id, postBody);
        res.json({
            status: 'success',message: 'Blog Updated Successfully ', data: updatedBlog
        })
    } catch (error) {
        throw new Error(error);
    }
});

const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    // validateMongoDbId(id);
    try {
      const getBlog = await Blog.findById(id)
        .populate("likes")
        .populate("disLikes");
      const updateViews = await Blog.findByIdAndUpdate(
        id,
        {
          $inc: { numViews: 1 },
        },
        { new: true }
      );
      res.json(getBlog);
    } catch (error) {
      throw new Error(error);
    }
  });

const getAllBlogs = asyncHandler( async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json({status: 'success', total: blogs.length, data: blogs})
    } catch (error) {
        throw new Error(error);
    }
});

const deleteBlog = asyncHandler( async (req, res) => {
    const id = req.params.id
    try {
        const deletedBlog = await Blog.findByIdAndDelete(id);
        res.json({status: 'success', message: 'Blog Deleted Successfully', data: deletedBlog})
    } catch (error) {
        throw new Error(error);
    }
});

const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isLiked = blog?.isLiked;
    // find if the user has disliked the blog
    const alreadyDisliked = blog?.dislikes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyDisliked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { dislikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { likes: loginUserId },
          isLiked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
});

const disLikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    // Find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    // find the login user
    const loginUserId = req?.user?._id;
    // find if the user has liked the blog
    const isDisLiked = blog?.isDisliked;
    // find if the user has disliked the blog
    const alreadyLiked = blog?.likes?.find(
      (userId) => userId?.toString() === loginUserId?.toString()
    );
    if (alreadyLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { likes: loginUserId },
          isLiked: false,
        },
        { new: true }
      );
      res.json(blog);
    }
    if (isDisLiked) {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $pull: { disLikes: loginUserId },
          isDisliked: false,
        },
        { new: true }
      );
      res.json(blog);
    } else {
      const blog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $push: { disLikes: loginUserId },
          isDisliked: true,
        },
        { new: true }
      );
      res.json(blog);
    }
});
  

module.exports = {createBlog, updateBlog, getBlog, getAllBlogs, deleteBlog, likeBlog, disLikeBlog};