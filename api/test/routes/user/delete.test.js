require('dotenv').config();

const userRoute = require("../../../routes/user/index");
const {createApp} = require("../../app_test");
const request = require("supertest");

const app = createApp();

app.use('/', userRoute);

const token = process.env.TEST_JWT;

test("delete route - not authorised", done => {
  request(app)
    .delete("/3")
    .expect("Content-Type", /json/)
    .expect({ error: { success: false, message: 'Not Authorized' } })
    .expect(403, done);
});

test("delete route", done => {
    request(app)
        .delete("/3")
        .set({Authorization: token})
        .expect("Content-Type", /json/)
        .expect({
            "success": true
        })
        .expect(200, done);
});
