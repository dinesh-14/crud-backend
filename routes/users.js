const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.route('/getAllUsers')
    .get(userController.getAllUsers);

router.route('/addUser')
    .post(userController.addUser);

router.route('/updateUser')
    .put(userController.updateUser);

router.route('/deleteUser')
    .put(userController.deleteUser);

module.exports = router;
