const express = require('express');
const authenticationRouter = express.Router( );
const authenticationController = require('../controllers/AuthenticationController');

authenticationRouter.get('/is_authenticated', authenticationController.isAuthenticated);
authenticationRouter.post('/authenticate', authenticationController.authenticate);

module.exports = authenticationRouter;