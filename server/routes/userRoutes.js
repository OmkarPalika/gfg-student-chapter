const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getUsers, getUser } = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);
router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;