var mongoose = require("mongoose");
var projectUserSchema = require("./project-user.schema.server");
var shelterModel = require("./shelter/shelter.model.server");
var adopterModel = require("./adopter/adopter.model.server");
var projectUserModel = mongoose.model("ProjectUserModel", projectUserSchema);

projectUserModel.deleteUser = deleteUser;
projectUserModel.updateUser = updateUser;
projectUserModel.findUserByCredentials = findUserByCredentials;
projectUserModel.findUserByUsername = findUserByUsername;
projectUserModel.findUserById = findUserById;
projectUserModel.createUser = createUser;
projectUserModel.saveShelter = saveShelter;
projectUserModel.removeWebsite = removeWebsite;

module.exports = projectUserModel;

function saveShelter(userId, shelter) {
    return projectUserModel
        .findById(userId)
        .then(function (user) {
            user.details = shelter._id;
            return user.save();
        });
}

function deleteUser(userId) {
    return projectUserModel.remove({_id: userId});
}

function updateUser(userId, user) {
    return projectUserModel.update({_id: userId},
        {$set: user});
}

function findUserByCredentials(username,password) {
    return projectUserModel.findOne({username: username, password: password});
}

function findUserByUsername(username) {
    return projectUserModel.findOne({username: username});
}

function removeWebsite(developerId,websiteId) {
    return projectUserModel
        .findById(developerId)
        .then(function (user) {
            var index = user.websites.indexOf(websiteId);
            user.websites.splice(index, 1);
            return user.save();
        });
}

function addWebsite(developerId, websiteId) {
    return projectUserModel
        .findById(developerId)
        .then(function (user) {
            user.websites.push(websiteId);
            return user.save();
        });
}

function createUser(user) {
    return projectUserModel.create(user);
}

function findUserById(userId) {
    return projectUserModel
        .findById(userId)
        .populate('websites','name');
}