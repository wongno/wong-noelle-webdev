var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));

//require("./test/app");
//require("./assignment/app");

var port = process.env.PORT || 3000;

app.listen(port);
require("./assignment/app.js");
//app.listen(port, ipaddress);
