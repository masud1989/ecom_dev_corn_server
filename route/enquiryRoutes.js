const express = require('express');
const { authMiddleware, isAdmin } = require('../middleware/authMiddleware');
const { createEnquiry, getEnquiry, getAllEnquiry, deleteEnquiry, updateEnquiry } = require('../controller/enquiryController');

const router = express.Router();

router.post('/createEnquiry', createEnquiry);
router.post('/updateEnquiry/:id', authMiddleware, isAdmin, updateEnquiry);
router.post('/deleteEnquiry/:id', authMiddleware, isAdmin, deleteEnquiry);
router.get('/getEnquiry/:id', authMiddleware, isAdmin, getEnquiry);
router.get('/getAllEnquiry', authMiddleware, isAdmin, getAllEnquiry);


module.exports = router;