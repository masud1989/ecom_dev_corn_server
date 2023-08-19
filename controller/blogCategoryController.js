const BlogCategory = require('../model/blogCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDBId');

const createCategory = asyncHandler( async(req, res) => {
    const postBody = req.body
    try {
        const newCategory = await BlogCategory.create(postBody)
        res.json({status: 'success', message: 'Category Created', data: newCategory})
    } catch (error) {
        throw new Error(error)
    }
});

const updateCategory = asyncHandler( async(req, res) => {
    const postBody = req.body
    const id = req.params.id
    try {
        const updateCategory = await BlogCategory.findByIdAndUpdate(id, postBody, {new: true})
        res.json({status: 'success', message: 'Category Updated', data: updateCategory})
    } catch (error) {
        throw new Error(error)
    }
});

const deleteCategory = asyncHandler( async(req, res) => {
    const id = req.params.id
    try {
        const deletedCategory = await BlogCategory.findByIdAndDelete(id)
        res.json({status: 'success', message: 'Category Deleted', data: deletedCategory})
    } catch (error) {
        throw new Error(error)
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const  id  = req.params.id;
    validateMongoDbId(id);
    try {
      const getCategory = await BlogCategory.findById(id);
      res.json(getCategory);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getAllCategory = asyncHandler(async (req, res) => {
    try {
      const getAllCategories = await BlogCategory.find();
      res.json({total: getAllCategories.length, getAllCategories});
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports = {createCategory, updateCategory, deleteCategory, getCategory, getAllCategory}