const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getUsers, getUser } = require('../controllers/userController');
const { auth, authorize } = require('../middleware');

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/', auth, authorize(['admin']), getUsers);
router.get('/:id', auth, getUser);

module.exports = router;
