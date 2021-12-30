require('dotenv').config();

const userRoute = require("../../../routes/user/index");
const {createApp} = require("../../app_test");
const request = require("supertest");

const app = createApp();

app.use('/', userRoute);

const token = process.env.TEST_JWT;

test("read route - not authorised", done => {
  request(app)
    .get("/1")
    .expect("Content-Type", /json/)
    .expect({ error: { success: false, message: 'Not Authorized' } })
    .expect(403, done);
});

test("read route", done => {
    request(app)
        .get("/1")
        .set({Authorization: token})
        .expect("Content-Type", /json/)
        .expect(function(res) {
             return Object.keys(res.body.result) > 0;
        })
        .expect(200, done);
});
