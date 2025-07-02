const express = require('express');
const {userController} = require('../controllers/userController');
const router = express.Router();

// Main Page dynamic HTML
router.get('/',userController.getMainPage);

// Register Page
router.get('/register', userController.showRegister);


//WHEN USER REGISTERS, THE EMAIL AND PASSWORD ARE STORED IN THE USERS.JSON FILE
router.post('/register', userController.register);

// Login Page
router.get('/login', userController.showLogin);
router.post('/login', userController.login);

module.exports = router;
