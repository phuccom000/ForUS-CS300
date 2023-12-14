const express = require('express');
const { readThread, updateThread, deleteThread, upvoteThread, downvoteThread } = require('../controllers/thread');
const { isAdmin } = require('../controllers/user');
const router = express.Router();

router.get('/:thread_id', readThread);
router.update('/:thread_id', /*isBanned*/ updateThread);
router.put('/:thread_id/upvote', upvoteThread);
router.put('/:thread_id/downvote', downvoteThread);
router.delete('/:thread_id', deleteThread);

module.exports = router;