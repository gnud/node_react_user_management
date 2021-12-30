const Controller = require("../../../lib/controller");
const {UserService} = require("../services/user");
const {UserNotFoundError, UserCreateFailedError} = require("../../../lib/errors");

class DeleteUser extends Controller {
    /**
     * Usage: DELETE /user/{:user id}
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async handle(request, response) {
        const userId = request.params.userId;
        const userService = await new UserService(this.db, request, response);

        try {
            await userService.deleteUser(userId);
        } catch (error) {
            switch (true) {
                case error instanceof UserNotFoundError:
                    return await this.handleResourceNotFound(error.message, response);

                case error instanceof UserCreateFailedError:
                    return await this.handleUnknownError(error.message, response);

                default:
                    return await this.handleUnknownError(error.message, response);
            }
        }

        response.json({ success: true});
    }
}

exports.DeleteUser = DeleteUser;
