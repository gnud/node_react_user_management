require('dotenv').config();

const userRoute = require("../../../routes/user/index");
const {createApp} = require("../../app_test");
const request = require("supertest");

const app = createApp();

app.use('/', userRoute);

const token = process.env.TEST_JWT;

const faker = require('faker');

function updateRecordData() {
    // noinspection JSUnresolvedVariable,JSUnresolvedFunction, JSCheckFunctionSignatures
    return {
        "name": `${faker.name.firstName()} ${faker.name.lastName()}`,
        "phone": `${faker.phone.phoneNumber()}`,
    };
}

test("update route - not authorised", done => {
    const data = updateRecordData();

  request(app)
    .patch("/2")
    .send(data)
    .expect({ error: { success: false, message: 'Not Authorized' } })
    .expect(403, done);
});

test("update route", done => {
    const data = updateRecordData();
    request(app)
        .patch("/2")
        .send(data)
        .set({Authorization: token})
        .expect(function(res) {
             return res.body.result.length > 0;
        })
        .expect(200, done);
});
