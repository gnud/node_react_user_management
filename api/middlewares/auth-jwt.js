const db = require("../db/models");

const {UserService} = require("../routes/user/services/user");
const {AuthService} = require("../routes/auth/services/auth");

function handleInvalidToken(request, response) {
    request.user = undefined;

    response.status(403).json({
        error: {
            success: false,
            message: 'Invalid JWT token',
        }
    });
}

function handleNoToken(request, response) {
    request.user = undefined;

    response.status(403).json({
        error: {
            success: false,
            message: 'Not Authorized',
        }
    });
}

function parseAuthHeader(request) {
    let headers = request.headers;
    if (!headers) {
        headers = {
            authorization: '',
        }
    }

    if (!headers.authorization) {
        return [null, null];
    }

    return request.headers.authorization.split(' ');
}

const verifyToken = async (request, response, next) => {
    const authService = await new AuthService(db, request, response);
    const userService = await new UserService(db, request, response);
    let decoded = null;

    const [bearerKey, accessToken] = parseAuthHeader(request);

    if (bearerKey !== 'JWT') {
        return handleNoToken(request, response);
    }

    decoded = authService.verifyJWTToken(accessToken);

    if (!decoded) {
        return handleInvalidToken(request, response);
    }

    const user = await userService.findExistingUserById(decoded.id);

    if (!user) {
        return handleInvalidToken(request, response);
    }

    request.user = user;
    next();
};

module.exports = {
    verifyToken,
};
