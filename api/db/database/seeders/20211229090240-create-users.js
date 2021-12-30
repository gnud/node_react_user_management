'use strict';

const faker = require('faker');
const bcrypt = require("bcrypt");

const randomItems = Array(30)
    .fill({})
    .map((item, inx) => inx + 10);

const statusTypes = ['active', 'suspended', 'registered'];

function generatePasswordHash(password) {
    // noinspection JSUnresolvedVariable
    let randomPassword = password || faker.internet.password();

    return bcrypt.hashSync(randomPassword, 8);
}

function createRecord(inx) {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction, JSCheckFunctionSignatures
    return {
        "id": inx,
        "name": `${faker.name.firstName()} ${faker.name.lastName()}`,
        "email": `${faker.internet.email()}`,
        "password": generatePasswordHash(),
        "phone": `${faker.phone.phoneNumber()}`,
        "status": faker.random.arrayElement(statusTypes),
        "last_login_at": faker.date.between('2022-01-01', '2022-01-10'),
        "createdAt": faker.date.between('2022-01-01', '2022-01-10'),
        "updatedAt": faker.date.between('2022-01-01', '2022-01-10'),
    };
}

function createAdminRecord(inx) {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction, JSCheckFunctionSignatures
    return {
        "id": inx,
        "name": `Root Rootski`,
        "email": `root@example.com`,
        "password": generatePasswordHash('password'),
        "phone": `${faker.phone.phoneNumber()}`,
        "status": 'active',
        "last_login_at": faker.date.between('2022-01-01', '2022-01-10'),
        "createdAt": faker.date.between('2022-01-01', '2022-01-10'),
        "updatedAt": faker.date.between('2022-01-01', '2022-01-10'),
    };
}

// noinspection JSUnusedGlobalSymbols,JSUnusedLocalSymbols
module.exports = {
    up: async (queryInterface, Sequelize) => {
        const demoUsers = randomItems.map((item, inx) => createRecord(inx));
        demoUsers.push(createAdminRecord(999));

        await queryInterface.bulkInsert('Users', demoUsers, {
                ignoreDuplicates: true
            }
        );

        // PG only, resets table SEQUENCE, so that we can have admin block of ids, but still use the lower ids
        // Or we can just allocate admins block from 0 to 10, but then again we limit how many admin we can have
        // TODO: get the (demoUsers length - 1) and pass it as variable
        await queryInterface.sequelize.query(`ALTER SEQUENCE public."Users_id_seq" RESTART WITH ${(demoUsers.length)};`);

        // to test next id: SELECT nextval('public."Users_id_seq"')
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('Users', null, {
            where: {
                id: {in: randomItems},
            }
        });
    }
};
