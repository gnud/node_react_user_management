const express = require('express');
const db = require("../../db/models");

const {verifyToken} = require('../../middlewares/auth-jwt');

const router = express.Router();

const UserListController = require('./controllers/list-user');
const UserCreateController = require('./controllers/create-user');
const UserReadController = require('./controllers/read-user');
const UserUpdateController = require('./controllers/update-user');
const UserDeleteController = require('./controllers/delete-user');

/* GET list users. */
router.get('/', verifyToken, async (
    request,
    response
) => new UserListController
    .ListUser(db)
    .handleRequest(request, response)
);

/* POST create user. */
router.post('/', verifyToken, async (
    request,
    response
) => new UserCreateController
    .CreateUser(db)
    .handleRequest(request, response)
);

/* GET read user. */
router.get('/:userId', verifyToken, async (
    request,
    response
) => new UserReadController
    .ReadUser(db)
    .handleRequest(request, response)
);

/* PATCH update user. */
router.patch('/:userId', verifyToken, async (
    request,
    response
) => new UserUpdateController
    .UpdateUser(db)
    .handleRequest(request, response)
);

/* DELETE remove user. */
router.delete('/:userId', verifyToken, async (
    request,
    response
) => new UserDeleteController
    .DeleteUser(db)
    .handleRequest(request, response)
);

module.exports = router;
