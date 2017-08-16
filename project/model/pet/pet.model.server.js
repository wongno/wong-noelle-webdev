var mongoose = require("mongoose");
var petSchema = require("./pet.schema.server");
var petModel = mongoose.model("PetModel", petSchema);
var userModel = require('../user/user.model.server');

petModel.createPet = createPet;
petModel.findPetsByShelter = findPetsByShelter;
petModel.findPetById = findPetById;
petModel.deletePet = deletePet;
petModel.updatePet = updatePet;
module.exports = petModel;


function updatePet(petId, pet) {
    return petModel.update({_id: petId},
        {$set: pet});
}

function deletePet(shelterId, petId) {
    return petModel
        .remove({_id: petId})
        .then(function (status) {
            return userModel.removeWebsite(shelterId, petId)
        });
}

function findPetById(petId) {
    return petModel.findById(petId);
}

function createPet(shelterId, pet){
    pet.shelter = shelterId;
    var petTmp = null;
    return petModel
        .create(pet)
        .then(function (shelterDoc) {
            petTmp = shelterDoc;
            return userModel.addWebsite(shelterId, shelterDoc);
        })
        .then(function (userDoc) {
            return petTmp;
        })
}

function findPetsByShelter(shelterId) {
    return petModel
        .find({_shelter: shelterId});
        // .populate('shelter', 'name')
        // .exec();
}