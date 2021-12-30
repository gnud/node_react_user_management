// noinspection JSCheckFunctionSignatures
require('dotenv').config();

const express = require('express');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const authRouter = require('./routes/auth');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/auth', authRouter);

module.exports = app;
