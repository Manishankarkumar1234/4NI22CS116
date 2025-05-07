const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');
const postsController = require('../controllers/posts.controller');

router.get('/users', usersController.getTopUsers);
router.get('/posts', postsController.getPosts);

module.exports = router;