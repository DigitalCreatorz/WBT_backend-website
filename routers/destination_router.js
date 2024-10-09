const express = require('express');
const router = express.Router();
const {get_city,get_uniqueCity,get_uniqueCountry,get_destinationBycity } = require('../controllers/destination_controller');

router.get('/getcity',get_city);
router.get('/unqiuecity',get_uniqueCity);
router.get('/unqiuecountry',get_uniqueCountry);
router.get('/attraction/:city', get_destinationBycity);


module.exports = router;
