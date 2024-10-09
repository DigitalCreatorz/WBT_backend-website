const express = require('express');
const router = express.Router();
const multer = require('multer');

// Configure multer to handle file uploads
const upload = multer({ limits: { fileSize: 20 * 1024 * 1024 }, storage: multer.memoryStorage() }).fields([
    { name: 'photos', maxCount: 10 },  
    { name: 'cover_img', maxCount: 1 }
]);

// Import your home controller functions
const { add_home, get_home, remove_home, edit_home,delete_home } = require('../controllers/home_controller');

// Define routes
router.post('/addhome', upload, add_home);
router.get('/gethome', get_home);
router.delete('/removehome/:_id', remove_home);
router.delete('/removehome', delete_home);
router.put('/edithome/:_id', edit_home);

// Export the router
module.exports = router;
