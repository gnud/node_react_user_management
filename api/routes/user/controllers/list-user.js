const Controller = require("../../../lib/controller");
const {UserService} = require("../services/user");

class ListUser extends Controller {
    /**
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async handle(request, response) {
        const users = await new UserService(this.db, request, response).listUsers();

        response.json({ success: true, result: users });
    }
}

exports.ListUser = ListUser;
