const db = require("../../../db/models");
const Op = db.Sequelize.Op;

const Service = require("../../../lib/service");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


class AuthService extends Service {
    async checkUserPassword(reqPass, userPass) {
        return bcrypt.compareSync(
            reqPass,
            userPass,
        );
    }

    verifyJWTToken(accessToken) {
        try {
            return jwt.verify(accessToken, process.env.API_SECRET);
         } catch (e) {
            return null;
        }
    }

}

module.exports = {
    AuthService
};
