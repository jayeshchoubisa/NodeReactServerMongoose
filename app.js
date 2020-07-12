var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors=require('cors');
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var db = require('./config/db.js');
var apiRouter = require('./routes/api');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api', apiRouter);

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

module.exports = app;
