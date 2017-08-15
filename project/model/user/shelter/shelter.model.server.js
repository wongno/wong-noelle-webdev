var mongoose = require("mongoose");
var userSchema = require("./shelter.schema.server");
//var db = require('../models.server');
var shelterModel = mongoose.model("shelterModel", shelterSchema);

shelterModel.deleteUser = deleteUser;
shelterModel.updateUser = updateUser;
shelterModel.findUserByCredentials = findUserByCredentials;
shelterModel.findUserByUsername = findUserByUsername;
shelterModel.findUserById = findUserById;
shelterModel.createUser = createUser;
shelterModel.addWebsite = addWebsite;
shelterModel.removeWebsite = removeWebsite;

module.exports = shelterModel;

function deleteUser(userId) {
    return userModel.remove({_id: userId});
}

function updateUser(userId, user) {
    return userModel.update({_id: userId},
        {$set: user});
}

function findUserByCredentials(username,password) {
    return userModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return userModel.findOne({username: username});
}

function removeWebsite(developerId,websiteId) {
    return userModel
        .findById(developerId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(developerId, websiteId) {
    return userModel
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