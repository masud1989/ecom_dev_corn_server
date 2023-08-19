const ProductCategory = require('../model/productCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDBId');

const createCategory = asyncHandler( async(req, res) => {
    const postBody = req.body
    try {
        const newProductCategory = await ProductCategory.create(postBody)
        res.json({status: 'success', message: 'Product Category Created', data: newProductCategory})
    } catch (error) {
        throw new Error(error)
    }
});

const updateCategory = asyncHandler( async(req, res) => {
    const postBody = req.body
    const id = req.params.id
    try {
        const updateCategory = await ProductCategory.findByIdAndUpdate(id, postBody, {new: true})
        res.json({status: 'success', message: 'Product Updated', data: updateCategory})
    } catch (error) {
        throw new Error(error)
    }
});

const deleteCategory = asyncHandler( async(req, res) => {
    const id = req.params.id
    try {
        const deletedCategory = await ProductCategory.findByIdAndDelete(id)
        res.json({status: 'success', message: 'Product Deleted', data: deletedCategory})
    } catch (error) {
        throw new Error(error)
    }
});

const getCategory = asyncHandler(async (req, res) => {
    const  id  = req.params.id;
    validateMongoDbId(id);
    try {
      const getCategory = await ProductCategory.findById(id);
      res.json(getCategory);
    } catch (error) {
      throw new Error(error);
    }
  });

  const getAllCategory = asyncHandler(async (req, res) => {
    try {
      const getAllCategories = await ProductCategory.find();
      res.json({total: getAllCategories.length, getAllCategories});
    } catch (error) {
      throw new Error(error);
    }
  });


module.exports = {createCategory, updateCategory, deleteCategory, getCategory, getAllCategory}