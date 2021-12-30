require('dotenv').config();

const authRoute = require("../../../routes/auth/index");
const {createApp} = require("../../app_test");
const request = require("supertest");
const expect = require('chai').expect;

const app = createApp();

app.use('/', authRoute);


const token = process.env.TEST_JWT;

const faker = require('faker');

function generatePasswordHash() {
    // noinspection JSUnresolvedVariable
    return faker.internet.password();
}

function createAdminData() {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction, JSCheckFunctionSignatures
    return {
        "email": `root@example.com`,
        "password": 'password',
    };
}

function createRandomUserData() {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction, JSCheckFunctionSignatures
    return {
        "email": `${faker.internet.email()}`,
        "password": generatePasswordHash(),
    };
}

test("login route - bad login", done => {
    const data = createRandomUserData();

  request(app)
    .post("/login")
    .send(data)
    .expect("Content-Type", /json/)
    .expect({ success: false, message: 'User not found' })
    .expect(404, done);
});

test("login route", done => {
    const data = createAdminData();
    request(app)
        .post("/login")
        .send(data)
        .set({Authorization: token})
        .expect("Content-Type", /json/)
        .then((res) => {
            expect(res.body).to.have.property('accessToken');
            done();
        })
});
