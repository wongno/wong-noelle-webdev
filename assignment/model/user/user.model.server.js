var mongoose = require("mongoose");
var userSchema = require("./user.schema.server");
var db = require('../models.server');
var userModel = mongoose.model("UserModel", userSchema);
module.exports = userModel;



// findUserByCreadentials(username, password)
// updateUser(userId, user)
// deleteUser(userId)

userModel.findUserByCredentials = findUserByCredentials;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserById = findUserById;
userModel.createUser = createUser;
userModel.addWebsite = addWebsite;
userModel.removeWebsite = removeWebsite;

function findUserByCredentials(username,password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function removeWebsite(developerId,websiteId) {
    userModel
        .findById(developerId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        })
}

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
    return userModel
        .findById(userId)
        .populate('websites','name');
}