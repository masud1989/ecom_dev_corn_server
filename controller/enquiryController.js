const Enquiry = require('../model/equiryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongoDBId');

const createEnquiry = asyncHandler( async(req, res) => {
    const postBody = req.body
    try {
        const newEnquiry = await Enquiry.create(postBody)
        res.json({status: 'success', message: 'Enquiry Created', data: newEnquiry})
    } catch (error) {
        throw new Error(error)
    }
});

const updateEnquiry = asyncHandler( async(req, res) => {
    const postBody = req.body
    const id = req.params.id
    try {
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id, postBody, {new: true})
        res.json({status: 'success', message: 'Enquiry Updated', data: updatedEnquiry})
    } catch (error) {
        throw new Error(error)
    }
});

const deleteEnquiry = asyncHandler( async(req, res) => {
    const id = req.params.id
    try {
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id)
        res.json({status: 'success', message: 'Enquiry Deleted', data: deletedEnquiry})
    } catch (error) {
        throw new Error(error)
    }
});

const getEnquiry = asyncHandler(async (req, res) => {
    const  id  = req.params.id;
    validateMongoDbId(id);
    try {
      const enquiry = await Enquiry.findById(id);
      res.json(enquiry);
    } catch (error) {
      throw new Error(error);
    }
});

  const getAllEnquiry = asyncHandler(async (req, res) => {
    try {
      const getAllEnquirys = await Enquiry.find();
      res.json({total: getAllEnquirys.length, getAllEnquirys});
    } catch (error) {
      throw new Error(error);
    }
});

module.exports = {createEnquiry, updateEnquiry, deleteEnquiry, getEnquiry, getAllEnquiry}