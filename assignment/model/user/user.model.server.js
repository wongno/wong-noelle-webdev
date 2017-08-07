var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require('../models.server');
var userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;

userModel.createUser = createUser;
userModel.addWebsite = addWebsite;

function addWebsite(developerId, websiteId) {
    userModel
        .findById(developerId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    return userModel.create(user);
}

function findUserById(userId) {
    return userModel.findById(userId);
}