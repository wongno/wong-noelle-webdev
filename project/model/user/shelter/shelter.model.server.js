var mongoose = require("mongoose");
var shelterSchema = require("./shelter.schema.server");
var projectUserModel = require("../project-user.model.server");
var shelterModel = mongoose.model("ShelterModel", shelterSchema);
shelterModel.findShelterByUserId = findShelterByUserId;
shelterModel.findShelterById = findShelterById;
shelterModel.createShelter = createShelter;
module.exports = shelterModel;

function findShelterById(shelterId) {
    return shelterModel.findById(shelterId);
}

function findShelterByUserId(userId) {
    return shelterModel.findOne({_link:userId});
}

function createShelter(userId,shelter) {
    return shelterModel.create(shelter);

}