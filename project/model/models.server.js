var q = require('q');
var connectionString = 'mongodb://127.0.0.1:27017/project';
var mongoose = require("mongoose");
var db = mongoose.connect(connectionString);
mongoose.Promise = q.Promise;
module.exports = db;
