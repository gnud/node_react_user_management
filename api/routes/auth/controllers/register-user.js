const Controller = require("../../../lib/controller");
const {UserService} = require("../../user/services/user");

class RegisterUser extends Controller {
    /**
     Sample JSON body:
     const data = {
          name: 'Petko',
          phone: '+38970123654',
          email: 'petko16@example.com',
          password: 'z1x2!c3v4$',
     };
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async handle(request, response) {
        const data = request.body;
        let newUser;

        try {
            // todo: call createUserRegister which will set state: "register"
            newUser = await new UserService(this.db, request, response).createUser(data);
        } catch (error) {
            return await this.handleBadRequest(error.message, response);
        }

        // TODO: add here send mail activation

        response.json({ success: true, result: newUser });
    }
}

exports.RegisterUser = RegisterUser;
