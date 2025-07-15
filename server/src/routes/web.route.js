const router = require('express').Router();
const AuthController = require('../controller/AuthController');

router.get('/auth/google', AuthController.googleOAuthLogin);

module.exports = router
