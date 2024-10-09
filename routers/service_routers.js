const express = require('express');
const router = express.Router();
const { upload, addservice, getservice, updateservice, deleteservice } = require('../controllers/service_controller'); // Adjust the path based on your folder structure

// Route to add a new testimonial
// Use `upload.single('image')` to handle single file uploads with the field name 'image'
router.post('/addservice', upload.single('image'), addservice);

// Route to get all testimonials
router.get('/getservice', getservice);

// Route to update a testimonial
// Use `upload.single('image')` to handle single file uploads if a new image is uploaded
router.put('/editservice/:_id', upload.single('image'), updateservice);

// Route to delete a testimonial
router.delete('/removeservice/:_id', deleteservice);

module.exports = router;
