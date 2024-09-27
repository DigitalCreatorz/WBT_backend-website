const express = require('express');
const router = express.Router();
const {add_contact, get_contact, remove_contact,edit_contact } = require('../controllers/contact_controller');

router.post('/addcontact',add_contact);
router.get('/getcontact',get_contact);
router.delete('/removecontact/:_id',remove_contact);
router.put('/editcontact/:_id',edit_contact);

module.exports = router;
