const Controller = require("../../../lib/controller");
const {UserService} = require("../services/user");

class ReadUser extends Controller {
    /**
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async handle(request, response) {
        const userId = request.params.userId;

        const users = await new UserService(this.db, request, response).readUser(userId);

        response.json({ success: true, result: users });
    }
}

exports.ReadUser = ReadUser;
