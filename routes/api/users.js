const express = require('express');
const router = express.Router();
const usersController = require('../../controllers/usersController');

router.route('/')
    .get(usersController.getUserNames)

router.route('/exists')
    .post(usersController.isUserExists)

module.exports = router;