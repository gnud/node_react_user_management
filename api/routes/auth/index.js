const express = require('express');
const db = require("../../db/models");

const AuthRegisterUserController = require('./controllers/register-user');

const router = express.Router();

const AuthLoginUserController = require('./controllers/login-user');

/* POST register user. */
router.post('/register', async (
    request,
    response
) => new AuthRegisterUserController
    .RegisterUser(db)
    .handleRequest(request, response)
);

/* POST login user. */
router.post('/login', async (
    request,
    response
) => new AuthLoginUserController
    .LoginUser(db)
    .handleRequest(request, response)
);

module.exports = router;
