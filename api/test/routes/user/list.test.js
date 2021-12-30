require('dotenv').config();

const userRoute = require("../../../routes/user/index");
const {createApp} = require("../../app_test");
const request = require("supertest");

const app = createApp();

app.use('/', userRoute);

const token = process.env.TEST_JWT;

test("list route - not authorised", done => {
  request(app)
    .get("/")
    .expect("Content-Type", /json/)
    .expect({ error: { success: false, message: 'Not Authorized' } })
    .expect(403, done);
});

test("list route", done => {
    request(app)
        .get("/")
        .set({Authorization: token})
        .expect("Content-Type", /json/)
        .expect(function(res) {
             return res.body.result.length > 0;
        })
        .expect(200, done);
});
