const express = require('express');
const { readBox, updateBox, deleteBox } = require('../controllers/box');
const { createThread } = require('../controllers/thread');
const { isAdmin } = require('../controllers/user');
const router = express.Router();

router.get('/:box_id/:page_limit', readBox);
router.post('/:box_id/thread', createThread);
router.put('/:box_id', isAdmin, updateBox);
router.delete('/:box_id', isAdmin, deleteBox);

module.exports = router;