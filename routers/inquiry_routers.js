const express = require('express');
const router = express.Router();
const inquiryControllers = require('../controllers/inquiry_controller');

router.route('/addinquiry').post( inquiryControllers.addinquiry);
router.route('/getinquiry').get( inquiryControllers.get_inquiry);

module.exports = router;
