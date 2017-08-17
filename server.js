var app = require('./express');
var express = app.express;

var passport      = require('passport');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "session",
    resave: true,
    saveUninitialized: true
}));
// app.set('view engine', 'ejs');
// require("./utilities/filelist");

app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

require("./test/app");
require("./project/app");
require("./assignment/app");

var port = process.env.PORT || 3000;

app.listen(port);