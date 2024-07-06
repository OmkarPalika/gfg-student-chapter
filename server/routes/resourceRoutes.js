const express = require('express');
const router = express.Router();
const { createResource, getResources, getResource, updateResource, deleteResource } = require('../controllers/resourceController');
const auth = require('../middleware/auth');

router.post('/', auth, createResource);
router.get('/', getResources);
router.get('/:id', getResource);
router.put('/:id', auth, updateResource);
router.delete('/:id', auth, deleteResource);

module.exports = router;