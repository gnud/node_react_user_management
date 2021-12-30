
const express = require("express");


function createApp() {
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: false}));

    return app;
}

module.exports = {
    createApp,
}
