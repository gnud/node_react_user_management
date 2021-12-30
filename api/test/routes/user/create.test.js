require('dotenv').config();

const userRoute = require("../../../routes/user/index");
const {createApp} = require("../../app_test");
const request = require("supertest");

const app = createApp();

app.use('/', userRoute);

const token = process.env.TEST_JWT;

const faker = require('faker');

function generatePasswordHash() {
    // noinspection JSUnresolvedVariable
    return faker.internet.password();
}

function createRecord() {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction, JSCheckFunctionSignatures
    return {
        "name": `${faker.name.firstName()} ${faker.name.lastName()}`,
        "email": `${faker.internet.email()}`,
        "password": generatePasswordHash(),
        "phone": `${faker.phone.phoneNumber()}`,
    };
}

test("create route - not authorised", done => {
    const data = createRecord();

  request(app)
    .post("/")
    .send(data)
    .expect("Content-Type", /json/)
    .expect({ error: { success: false, message: 'Not Authorized' } })
    .expect(403, done);
});

test("create route", done => {
    const data = createRecord();
    request(app)
        .post("/")
        .send(data)
        .set({Authorization: token})
        .expect("Content-Type", /json/)
        .expect(function(res) {
             return res.body.result.length > 0;
        })
        .expect(200, done);
});
