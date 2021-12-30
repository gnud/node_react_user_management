class UserExistsError extends Error {
    constructor(message, options = {user: 'unknown'}) {
        super();

        this.message = message || `User '${options.user}' exists.`;

        for (const [key, value] of Object.entries(options)) {
            this[key] = value;
        }
    }
}

class UserCreateFailedError extends Error {
    constructor(message) {
        super();

        this.message = message || `User create failed, try again later.`;
    }
}

class UserNotFoundError extends Error {
    constructor(message, options = {userId: 'unknown'}) {
        super();

        this.message = message || `User with id ${options.userId} not found.`;
    }
}

module.exports = {
    UserExistsError,
    UserCreateFailedError,
    UserNotFoundError,
}
