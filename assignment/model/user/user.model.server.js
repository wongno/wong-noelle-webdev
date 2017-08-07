var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require('../models.server');
var userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;

userModel.createUser = createUser;

function createUser(user) {
    return userModel.create(user);
}