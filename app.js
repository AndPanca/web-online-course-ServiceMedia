require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//ROUTER SETTING INITIAL FOR OPEN /route/media.js
const indexRouter = require('./routes/index');
const mediaRouter = require('./routes/media');

const app = express();

app.use(logger('dev'));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTER USE 
app.use('/', indexRouter);
app.use('/media', mediaRouter);

module.exports = app;
