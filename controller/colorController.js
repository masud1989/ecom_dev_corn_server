const Color = require('../model/colorModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDBId');

const createColor = asyncHandler( async(req, res) => {
    const postBody = req.body
    try {
        const newColor = await Color.create(postBody)
        res.json({status: 'success', message: 'Color Created', data: newColor})
    } catch (error) {
        throw new Error(error)
    }
});

const updateColor = asyncHandler( async(req, res) => {
    const postBody = req.body
    const id = req.params.id
    try {
        const updatedColor = await Color.findByIdAndUpdate(id, postBody, {new: true})
        res.json({status: 'success', message: 'Color Updated', data: updatedColor})
    } catch (error) {
        throw new Error(error)
    }
});

const deleteColor = asyncHandler( async(req, res) => {
    const id = req.params.id
    try {
        const deletedColor = await Color.findByIdAndDelete(id)
        res.json({status: 'success', message: 'Product Deleted', data: deletedColor})
    } catch (error) {
        throw new Error(error)
    }
});

const getColor = asyncHandler(async (req, res) => {
    const  id  = req.params.id;
    validateMongoDbId(id);
    try {
      const color = await Color.findById(id);
      res.json(color);
    } catch (error) {
      throw new Error(error);
    }
});

  const getAllColor = asyncHandler(async (req, res) => {
    try {
      const getAllColors = await Color.find();
      res.json({total: getAllColors.length, getAllColors});
    } catch (error) {
      throw new Error(error);
    }
});




module.exports = {createColor, updateColor, deleteColor, getColor, getAllColor}