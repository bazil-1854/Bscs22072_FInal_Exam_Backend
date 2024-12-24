const express = require('express');
const authenticate = require('../middleware/authMiddleware');
const { getProfile } = require('../controllers/profileController'); 

const router = express.Router();

router.get('/user-profile', authenticate, getProfile); 

module.exports = router;
