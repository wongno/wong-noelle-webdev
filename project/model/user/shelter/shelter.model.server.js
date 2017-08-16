var mongoose = require("mongoose");
var shelterSchema = require("./shelter.schema.server");
var projectUserModel = require("../project-user.model.server");
var shelterModel = mongoose.model("ShelterModel", shelterSchema);
shelterModel.findShelterByUserId = findShelterByUserId;
shelterModel.findShelterById = findShelterById;
shelterModel.createShelter = createShelter;
shelterModel.addPet = addPet;
shelterModel.removePet = removePet;
module.exports = shelterModel;

function removePet(shelterId, petId) {
    return shelterModel
        .findById(shelterId)
        .then(function (shelter) {
            var index = shelter.pets.indexOf(petId);
           shelter.splice(index, 1);
            return shelter.save();
        });
}

function addPet(shelterId, pet) {
    return shelterModel
        .findById(shelterId)
        .then(function (shelter) {
            shelter.pets.push(pet);
            return shelter.save();
        });
}

function findShelterById(shelterId) {
    return shelterModel.findById(shelterId);
}

function findShelterByUserId(userId) {
    return shelterModel.findOne({_link:userId});
}

function createShelter(userId,shelter) {
    return shelterModel.create(shelter);

}