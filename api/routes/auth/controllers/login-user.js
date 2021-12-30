const jwt = require("jsonwebtoken");

const Controller = require("../../../lib/controller");
const {UserService} = require("../../user/services/user");
const {AuthService} = require("../services/auth");


class LoginUser extends Controller {
    /**
     Sample JSON body:
     const data = {
          email: 'petko16@example.com',
          password: 'z1x2!c3v4$',
     };
     * @param request
     * @param response
     * @returns {Promise<void>}
     */
    async handle(request, response) {
        const data = request.body;

        const authService = await new AuthService(this.db, request, response);
        const userService = await new UserService(this.db, request, response);

        let user = await userService.findExistingUserByEmail(data.email);

        if (!user) {
            return this.handleResourceNotFound('User not found', response);
        }

        try {
            await authService.checkUserPassword(data.password, user.password);
        } catch (error) {
            const a = 0;
            return await this.handleBadRequest(error.message, response);
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.API_SECRET, {
            expiresIn: 86400 // expires in 24 hours
        });

        response.json({
            success: true,
            accessToken: token,
            message: "Login complete",
        });
    }
}

exports.LoginUser = LoginUser;
