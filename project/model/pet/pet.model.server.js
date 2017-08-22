var mongoose = require("mongoose");
var petSchema = require("./pet.schema.server");
var petModel = mongoose.model("PetModel", petSchema);
var shelterModel = require('../user/shelter/shelter.model.server');
petModel.addPet = addPet;
petModel.createPet = createPet;
petModel.findPetsByShelter = findPetsByShelter;
petModel.findPetByAdopter = findPetByAdopter;
petModel.findPetsByAdopter = findPetsByAdopter;
petModel.findPetById = findPetById;
petModel.deletePet = deletePet;
petModel.updatePet = updatePet;
petModel.selectPet = selectPet;
module.exports = petModel;

function selectPet(pet) {
    return petModel.create(pet);
}
function findPetsByAdopter(adopterId) {
    return petModel.find({_adopter:adopterId});
}

function findPetByAdopter(adopterId,petId) {
    return petModel.findOne({apiId:petId});
}

function addPet(adopterId, pet) {
    return petModel.create(pet);
}

function updatePet(petId, pet) {
    return petModel.update({_id: petId},
        {$set: pet});
}

function deletePet(shelterId, petId) {
    return petModel
        .remove({_id: petId})
        .then(function (status) {
            return shelterModel.removePet(shelterId, petId);
        });
}

function findPetById(petId) {
    return petModel.findById(petId);
}

function createPet(shelterId, pet){
    pet._shelter = shelterId;
    var petTmp = null;
    return petModel
        .create(pet)
        .then(function (petDoc) {
            petTmp = petDoc;
            return shelterModel.addPet(shelterId, petDoc);
        })
        .then(function (shelterDoc) {
            return petTmp;
        });
}

function findPetsByShelter(shelterId) {
    return petModel
        .find({_shelter: shelterId});
}