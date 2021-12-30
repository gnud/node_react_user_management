const Controller = require("../../../lib/controller");
const {UserService} = require("../services/user");

class UpdateUser extends Controller {
    /**
     Sample JSON body:
     const data = {
          name: 'Petko',
          phone: '+38970123654',
     };
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async handle(request, response) {
        const userId = request.params.userId;
        const data = request.body;
        let updatedUser;

        try {
            updatedUser = await new UserService(this.db, request, response).updateUser(userId, data);
        } catch (error) {
            return await this.handleBadRequest(error.message, response);
        }

        response.json({ success: true, result: updatedUser });
    }
}

exports.UpdateUser = UpdateUser;
