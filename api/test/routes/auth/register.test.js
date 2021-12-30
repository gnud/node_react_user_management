require('dotenv').config();

const authRoute = require("../../../routes/auth/index");
const {createApp} = require("../../app_test");
const request = require("supertest");
const expect = require('chai').expect;

const app = createApp();

app.use('/', authRoute);


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

test("register route - bad login", done => {
    const data = createRecord();

  request(app)
    .post("/register")
    .send(data)
    .expect("Content-Type", /json/)
    .then(()=>{
      request(app)
        .post("/register")
        .send(data)
        .expect("Content-Type", /json/)
        .expect({ success: false, message: `User '${data.email}' exists.` })
        .expect(500, done);
    });
});

test("register route", done => {
    const data = createRecord();
    request(app)
        .post("/register")
        .send(data)
        .expect("Content-Type", /json/)
        .then((res) => {
            expect(res.body.result).to.have.property('email');
            done();
        })
});
