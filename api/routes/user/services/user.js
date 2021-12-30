const db = require("../../../db/models");
const Op = db.Sequelize.Op;

const Service = require("../../../lib/service");
const {UserExistsError, UserCreateFailedError, UserNotFoundError} = require("../../../lib/errors");
const bcrypt = require("bcrypt");

userSensitiveFields = [
    'password',
];


class UserService extends Service {
    async findExistingUser(data) {
        const {phone, email} = data;

        // noinspection JSUnresolvedVariable
        const user = await this.db
            .User
            .findAll({
                    limit: 1,
                    where: {
                        [Op.or]: [
                            {phone}, {email}
                        ]
                    },
                    attributes: {
                        exclude: userSensitiveFields
                    },
                }
            );
        return user.shift();
    }

    async findAllUsers() {
        // noinspection JSUnresolvedVariable
        return await this.db.User.findAll(
            {
                attributes: {
                    exclude: userSensitiveFields
                },
            }
        );
    }

    async findExistingUserById(id) {

        // noinspection JSUnresolvedVariable
        return await this.db
            .User
            .findByPk(
                id
            );
    }

    async findExistingUserByIdSafe(id) {

        // noinspection JSUnresolvedVariable
        return await this.db
            .User
            .findByPk(
                id, {
                    attributes: {
                        exclude: userSensitiveFields
                    },
                }
            );
    }

    async findExistingUserByEmail(email) {

        // noinspection JSUnresolvedVariable
        return await this.db
            .User
            .findOne(
                {
                    where: {
                        email: email,
                    }
                },
            );
    }

    async createUser(data) {
        const {phone, email, name, password} = data;

        const passwordHashed = bcrypt.hashSync(password, 8)

        let user = await this.findExistingUser(data);

        if (user) {
            throw new UserExistsError(null, {user: email});
        }

        try {
            // noinspection JSUnresolvedVariable
            user = await this.db.User.create({
                name,
                email,
                password: passwordHashed,
                phone,
                status: 'active',
            });
        } catch (error) {
            throw new UserCreateFailedError();
        }

        return user;
    }

    async deleteUser(id) {
        let user = await this.findExistingUserById(id);

        if (!user) {
            throw new UserNotFoundError(null, {userId: id});
        }

        try {
            // noinspection JSUnresolvedVariable
            user.destroy();
        } catch (error) {
            throw new UserCreateFailedError();
        }

        return user;
    }

    async listUsers() {
        return await this.findAllUsers();
    }

    async updateUser(id, data) {
        const {phone, name} = data;

        let user = await this.findExistingUserById(id);

        if (!user) {
            throw new UserNotFoundError(null, {userId: id});
        }

        try {
            // noinspection JSUnresolvedVariable
            user = await user.update({
                name,
                phone,
            }, {where: {}});
        } catch (error) {
            throw new UserCreateFailedError();
        }

        return user;
    }

    async readUser(id) {
        let user = await this.findExistingUserByIdSafe(id);

        if (!user) {
            throw new UserNotFoundError(null, {userId: id});
        }

        return user;
    }
}

module.exports = {
    UserService
};
